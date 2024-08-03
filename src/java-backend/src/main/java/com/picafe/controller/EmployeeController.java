package com.picafe.controller;

import com.picafe.dto.*;
import com.picafe.entities.Employee;
import com.picafe.entities.Store;
import com.picafe.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/picafepos/api/v1/employees")
public class EmployeeController {

    private static final Logger logger = Logger.getLogger(EmployeeController.class.getName());

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeCreateRequest employeeCreateRequest) {

        logger.log(Level.INFO, "Received request to create employee: {0}", employeeCreateRequest);
        try {
            // Validate input data
//            if (employeeCreateRequest==null ||employeeCreateRequest.getName()==null || employeeCreateRequest.getPassword()==null || employeeCreateRequest.getSalary()==null || employeeCreateRequest.getPosition()==null || employeeCreateRequest.getManager_id()==null) {
//                logger.log(Level.WARNING, "Invalid input data: {0}", employeeCreateRequest);
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input data");
//            }
            // Authorization check
            if (!employeeService.isStoreManager(employeeCreateRequest.getManagerId())) {
                logger.log(Level.WARNING, "Unauthorized access by manager ID: {}", employeeCreateRequest.getManagerId());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
            // If authorization is successful, proceed to create employee
            Employee createdEmployee = employeeService.createEmployee(employeeCreateRequest);
            logger.log(Level.INFO, "Employee created successfully with ID: {0}", createdEmployee.getEmployeeid());

            // Prepare response body
            return ResponseEntity.ok(new EmployeeCreateResponse(createdEmployee.getEmployeeid(), "Employee successfully created"));

        } catch (SecurityException e) {
            // Catch any security-related exceptions
            logger.log(Level.SEVERE, "Security exception occurred: {0}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Unexpected server error: {0}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected server error");
        }
    }

    @PutMapping("/edit/{employee_id}")
    public ResponseEntity<?> editEmployee(@PathVariable("employee_id") Long empId, @RequestBody EmployeeUpdateRequest updates) {
        logger.log(Level.INFO, "Received request to update employee with ID: {0}", empId);
        try {
            if (updates.getName() == null || updates.getPassword() == null || updates.getSalary() == null || updates.getManager_id() == null) {
                logger.log(Level.WARNING, "Invalid input data: {0}", updates);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input data");
            }

            if (!employeeService.isStoreManager(updates.getManager_id())) {
                logger.log(Level.WARNING, "Unauthorized access by manager ID: {0}", updates.getManager_id());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            Employee updatedEmployee = employeeService.editEmployee(empId, updates);
            logger.log(Level.INFO, "Employee details updated successfully with ID: {0}", empId);

           // createdEmployee.getEmployeeid(), "Employee successfully created")
            return ResponseEntity.ok(new EmployeeUpdateResponse(empId,"Employee details updated successfully"));

        } catch (NoSuchElementException e) {
            logger.log(Level.WARNING, "Employee with specified ID not found: {0}", empId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee with specified ID not found");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Unexpected server error: {0}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected server error");
        }
    }

    @GetMapping("/store")
    public ResponseEntity<List<EmployeeGetResponse>> getEmployeesByStoreId(@RequestParam Store store) {
        logger.log(Level.INFO, "Received request to get employees by store ID: {0}", store);
        List<EmployeeGetResponse> employees = employeeService.getEmployeesByStoreId(store);
        List<EmployeeGetResponse> nonManagerEmployees = employees.stream()
                .filter(employee -> !employee.getPosition().trim().equalsIgnoreCase("Manager"))
                .collect(Collectors.toList());

        return ResponseEntity.ok(nonManagerEmployees);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteEmployee(@RequestParam(required = false) Long employeeId) {
        if (employeeId == null) {
            logger.log(Level.WARNING, "Employee ID cannot be empty");
            return new ResponseEntity<>(new ApiResponse("Employee ID cannot be empty"), HttpStatus.BAD_REQUEST);
        }

        try {
            boolean isDeleted = employeeService.deleteEmployeeById(employeeId);
            if (isDeleted) {
                logger.log(Level.INFO, "Employee deleted successfully");
                return new ResponseEntity<>(new ApiResponse("Employee deleted successfully"), HttpStatus.OK);
            } else {
                logger.log(Level.WARNING, "Employee not found");
                return new ResponseEntity<>(new ApiResponse("Employee not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Unexpected server error", e);
            return new ResponseEntity<>(new ApiResponse("Unexpected server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static class ApiResponse {
        private String message;

        public ApiResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
