package com.picafe.repository;

import com.picafe.entities.CustomerFeedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerFeedbackRepository extends JpaRepository<CustomerFeedback, Long> {

}
