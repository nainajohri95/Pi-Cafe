package com.picafe.controller;

import com.picafe.dto.OrderRequest;
import com.picafe.dto.OrderResponse;
import com.picafe.dto.OrderResponseDTO;
import com.picafe.entities.Order;
import com.picafe.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/picafepos/api/v1/orders")
@Slf4j
public class OrderController {

    private static final Logger logger = Logger.getLogger(OrderController.class.getName());

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<OrderResponseDTO> getOrders(@RequestParam Long storeId) {
        try {
            logger.info("Received request to fetch today's orders for store ID: " + storeId);
            OrderResponseDTO orders = orderService.getOrdersForToday(storeId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error occurred while fetching orders: ", e);
            return ResponseEntity.status(500).body(null);
        }
    }


    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        logger.info("Received request to create order: {}");
        try {

            //validateOrderRequest(orderRequest);
            // Save the order
            Order createdOrder = orderService.createOrder(orderRequest);
            // Respond with the created order ID
           // log.info("Order successfully created with ID: {}", createdOrder.getOrderId());
            return ResponseEntity.ok(new OrderResponse(createdOrder.getOrderId(), "Order successfully created"));
        } catch (IllegalArgumentException e) {
            // Handle bad request (400)
            logger.info("Bad request received: {}");
            return ResponseEntity.badRequest().body("Malformed or invalid request format: " + e.getMessage());
        } catch (Exception e) {
            // Handle internal server error (500)
            logger.info("Unexpected server error occurred: {}");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected server error: " + e.getMessage());
        }
    }
}
