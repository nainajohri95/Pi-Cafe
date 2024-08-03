package com.picafe.service;

import com.picafe.dto.OrderRequest;
import com.picafe.dto.OrderResponseDTO;
import com.picafe.entities.Order;

public interface OrderService {
    OrderResponseDTO getOrdersForToday(Long storeId);
    Order createOrder(OrderRequest orderRequest);
}
