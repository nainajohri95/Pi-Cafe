package com.picafe;

import com.picafe.controller.OrderController;
import com.picafe.dto.OrderRequest;
import com.picafe.dto.OrderResponse;
import com.picafe.dto.OrderResponseDTO;
import com.picafe.entities.Order;
import com.picafe.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OrderControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getOrders_success() {
        // Arrange
        Long storeId = 1L;
        OrderResponseDTO mockOrderResponseDTO = new OrderResponseDTO();
        when(orderService.getOrdersForToday(storeId)).thenReturn(mockOrderResponseDTO);

        // Act
        ResponseEntity<OrderResponseDTO> response = orderController.getOrders(storeId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockOrderResponseDTO, response.getBody());
        verify(orderService).getOrdersForToday(storeId);
    }

    @Test
    void getOrders_failure() {
        // Arrange
        Long storeId = 1L;
        when(orderService.getOrdersForToday(storeId)).thenThrow(new RuntimeException("Error fetching orders"));

        // Act
        ResponseEntity<OrderResponseDTO> response = orderController.getOrders(storeId);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
        verify(orderService).getOrdersForToday(storeId);
    }

//    @Test
//    void createOrder_success() {
//        // Arrange
//        OrderRequest orderRequest = new OrderRequest();
//        orderRequest.setName("John Doe");
//        orderRequest.setId(1L);
//        orderRequest.setDate(new Date());
//        orderRequest.setStoreId(1L);
//        orderRequest.setPrice(100L);
//        orderRequest.setOrderMode("Online");
//        orderRequest.setItems(Map.of(1L, 2L));
//
//        Order mockOrder = new Order();
//        mockOrder.setOrderId(1L);
//        when(orderService.createOrder(any(OrderRequest.class))).thenReturn(mockOrder);
//
//        // Act
//        ResponseEntity<?> response = orderController.createOrder(orderRequest);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        OrderResponse expectedResponse = new OrderResponse(1L, "Order successfully created");
//        assertEquals(expectedResponse, response.getBody());
//        verify(orderService).createOrder(any(OrderRequest.class));
//    }

    @Test
    void createOrder_badRequest() {
        // Arrange
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setName("John Doe");
        orderRequest.setId(1L);
        orderRequest.setDate(new Date());
        orderRequest.setStoreId(1L);
        orderRequest.setPrice(100L);
        orderRequest.setOrderMode("Online");
        orderRequest.setItems(Map.of(1L, 2L));

        when(orderService.createOrder(any(OrderRequest.class))).thenThrow(new IllegalArgumentException("Invalid order data"));

        // Act
        ResponseEntity<?> response = orderController.createOrder(orderRequest);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Malformed or invalid request format: Invalid order data", response.getBody());
        verify(orderService).createOrder(any(OrderRequest.class));
    }

    @Test
    void createOrder_internalServerError() {
        // Arrange
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setName("John Doe");
        orderRequest.setId(1L);
        orderRequest.setDate(new Date());
        orderRequest.setStoreId(1L);
        orderRequest.setPrice(100L);
        orderRequest.setOrderMode("Online");
        orderRequest.setItems(Map.of(1L, 2L));

        when(orderService.createOrder(any(OrderRequest.class))).thenThrow(new RuntimeException("Unexpected error"));

        // Act
        ResponseEntity<?> response = orderController.createOrder(orderRequest);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Unexpected server error: Unexpected error", response.getBody());
        verify(orderService).createOrder(any(OrderRequest.class));
    }
}
