package com.picafe.repository;

import com.picafe.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Customerrepo extends JpaRepository<Customer,Long> {

    Customer findByEmail(String email);
//    boolean existsByEmail(String Email);
}
