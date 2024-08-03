package com.picafe.service;


import com.picafe.Utils.JwtUtil;
import com.picafe.entities.Employee;
import com.picafe.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Authentication {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(Authentication.class);

    public Optional<Employee> authenticate(Long employeeId, String password) {
        logger.info("Attempting to authenticate employee with ID: {}", employeeId);
        Optional<Employee> employee = employeeRepository.findByEmployeeidAndPassword(employeeId, password);
        if (employee.isPresent()) {
            logger.info("Authentication successful for employee ID: {}", employeeId);
        } else {
            logger.warn("Authentication failed for employee ID: {}", employeeId);
        }

        return employee;
    }

    public String generateJwtToken(Employee employee) {

        return jwtUtil.generateToken(String.valueOf(employee.getEmployeeid()));
    }
}
