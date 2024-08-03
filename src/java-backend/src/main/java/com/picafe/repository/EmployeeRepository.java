package com.picafe.repository;

import com.picafe.entities.Employee;

import java.util.List;
import java.util.Optional;

import com.picafe.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeidAndPassword(Long employeeid, String password);
    Optional<Employee>findByEmployeeidAndPosition(Long employeeid,String position);
    List<Employee> findByStore(Store store);
}
