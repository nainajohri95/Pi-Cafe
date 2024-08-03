package com.picafe.service;

import com.picafe.dto.EmployeeCreateRequest;
import com.picafe.dto.EmployeeGetResponse;
import com.picafe.dto.EmployeeUpdateRequest;
import com.picafe.entities.Employee;
import com.picafe.entities.Store;
import com.picafe.repository.EmployeeRepository;
import com.picafe.repository.StoreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger logger = Logger.getLogger(EmployeeServiceImpl.class.getName());

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Employee createEmployee(EmployeeCreateRequest employeeCreateRequest) throws ParseException {

        // Create an Employee entity from the DTO
        logger.log(Level.INFO, "Creating employee with request: {0}", employeeCreateRequest);
        Store store = storeRepository.findById(employeeCreateRequest.getStoreId())
                .orElseThrow(() -> new EntityNotFoundException("Store not found with ID " + employeeCreateRequest.getStoreId()));
        logger.log(Level.INFO, "Store found: {0}", store);
        Employee employee = new Employee();
        employee.setStore(store);
        employee.setName(employeeCreateRequest.getName());
        employee.setPassword(employeeCreateRequest.getPassword());
        employee.setSalary(employeeCreateRequest.getSalary());
        employee.setPosition(employeeCreateRequest.getPosition()); // Set the role to 'EMPLOYEE'
//        employee.setRecordupdatedate();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = sdf.format(new Date());
        Date date = sdf.parse(dateString);
        employee.setRecordupdatedate(date);

        // Save the employee details to the database
        Employee savedEmployee = employeeRepository.save(employee);
        logger.log(Level.INFO, "Employee created successfully with ID: {0}", savedEmployee.getEmployeeid());
        return savedEmployee;
    }

    @Override
    public Employee editEmployee(Long employeeId, EmployeeUpdateRequest updates) {

        logger.log(Level.INFO, "Updating employee with ID: {0}", employeeId);
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));

        // Update employee details based on the provided updates
        if (updates.getName() != null) {
            employee.setName(updates.getName());
        }
        if (updates.getPassword() != null) {
            employee.setPassword(updates.getPassword());
        }
        if (updates.getSalary() != null) {
            employee.setSalary(updates.getSalary());
        }

        Employee updatedEmployee = employeeRepository.save(employee);
        logger.log(Level.INFO, "Employee with ID {0} updated successfully", employeeId);

        return updatedEmployee;
    }

    @Override
    public List<EmployeeGetResponse> getEmployeesByStoreId(Store store) {
        List<Employee> employees = employeeRepository.findByStore(store);
        return employees.stream()
                .map(employee -> new EmployeeGetResponse(
                        employee.getEmployeeid(),
                        employee.getName(),
                        employee.getSalary(),
                        employee.getPosition()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isStoreManager(Long managerId) {
        logger.log(Level.INFO, "Checking if employee with ID {0} is a store manager", managerId);
        Optional<Employee> manager = employeeRepository.findByEmployeeidAndPosition(managerId, "Manager");
        boolean isManager = manager.isPresent();
        if (isManager) {
            logger.log(Level.INFO, "Employee with ID {0} is a store manager", managerId);
        } else {
            logger.log(Level.WARNING, "Employee with ID {0} is not a store manager", managerId);
        }
        return isManager;
    }

    @Override
    public boolean deleteEmployeeById(Long employeeId) {
        try {
            if (employeeRepository.existsById(employeeId)) {
                employeeRepository.deleteById(employeeId);
                logger.info("Employee with ID " + employeeId + " deleted");
                return true;
            } else {
                logger.warning("Employee with ID " + employeeId + " not found");
                return false;
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error occurred while deleting employee with ID " + employeeId, e);
            return false;
        }
    }
}
