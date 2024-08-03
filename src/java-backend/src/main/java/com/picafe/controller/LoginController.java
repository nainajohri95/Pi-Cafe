package com.picafe.controller;


import com.picafe.entities.Employee;
import com.picafe.service.Authentication;
import com.picafe.dto.EmployeeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("pos/api/login")
public class LoginController {
    @Autowired
    private Authentication authentication;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);


    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Long employeeId = loginRequest.getEmployeeId();
        String password = loginRequest.getPassword();

        logger.info("Login attempt for employee ID: {}", employeeId);
        Optional<Employee> authenticatedEmployee = authentication.authenticate(employeeId, password);

        try {
            if (authenticatedEmployee.isPresent()) {
                Employee employee = authenticatedEmployee.get();
                Long storeId = employee.getStore() != null ? employee.getStore().getStoreId() : null;
                EmployeeDTO employeeDTO = new EmployeeDTO(
                        employee.getEmployeeid(),
                        employee.getName(),
                        employee.getPosition(),
                        storeId
                );
                String token = authentication.generateJwtToken(authenticatedEmployee.get());
                Map<String, Object> response = new HashMap<>();
                response.put("employee", employeeDTO);
                response.put("token", token);
                logger.info("Login successful for employee ID: {}", employeeId);
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Login failed for employee ID: {}", employeeId);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
        }
        catch (Exception e) {
            logger.error("Error generating employee for employee ID: {}", employeeId, e);
            throw e;
        }
    }

}

