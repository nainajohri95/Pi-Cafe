package com.picafe;

import com.picafe.controller.EmployeeController;
import com.picafe.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class EmployeeControllerTest {

    @Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testDeleteEmployeeSuccess() {
        Long employeeId = 1L;
        when(employeeService.deleteEmployeeById(employeeId)).thenReturn(true);

        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Employee deleted successfully", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteEmployeeNotFound() {
        Long employeeId = 2L;
        when(employeeService.deleteEmployeeById(employeeId)).thenReturn(false);

        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Employee not found", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteEmployeeUnexpectedError() {
        Long employeeId = 3L;
        when(employeeService.deleteEmployeeById(employeeId)).thenThrow(new RuntimeException());

        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Unexpected server error", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteEmployeeWithInvalidId() {
        Long employeeId = -1L;
        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Employee not found", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteEmployeeWithNullId() {
        Long employeeId = null;
        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Employee ID cannot be empty", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }

    @Test
    void testDeleteEmployeeWithWhitespaceId() {
        Long employeeId = null;
        ResponseEntity<?> response = employeeController.deleteEmployee(employeeId);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Employee ID cannot be empty", ((EmployeeController.ApiResponse) response.getBody()).getMessage());
    }
}
