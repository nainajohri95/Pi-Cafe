package com.picafe.repository;

import com.picafe.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT od FROM Order od WHERE od.orderDate >= :startDate AND od.orderDate < :endDate AND od.store.id = :storeId")
    List<Order> findByOrderDateAndStore(@Param("startDate") Date startDate,
                                        @Param("endDate") Date endDate,
                                        @Param("storeId") Long storeId);
}
