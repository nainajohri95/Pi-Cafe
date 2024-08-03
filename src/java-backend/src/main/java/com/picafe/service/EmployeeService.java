package com.picafe.service;

import com.picafe.dto.EmployeeCreateRequest;
import com.picafe.dto.EmployeeGetResponse;
import com.picafe.dto.EmployeeUpdateRequest;
import com.picafe.entities.Employee;
import com.picafe.entities.Store;

import java.text.ParseException;
import java.util.List;

public interface EmployeeService {
    Employee createEmployee(EmployeeCreateRequest employeeCreateRequest) throws ParseException;
    Employee editEmployee(Long employeeId, EmployeeUpdateRequest updates);
    List<EmployeeGetResponse> getEmployeesByStoreId(Store store);

    boolean isStoreManager(Long managerId);
    boolean deleteEmployeeById(Long employeeId);
}

