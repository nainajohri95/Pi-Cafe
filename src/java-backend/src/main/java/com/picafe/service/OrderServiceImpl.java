package com.picafe.service;

import com.picafe.dto.OrderRequest;
import com.picafe.dto.OrderResponseDTO;
import com.picafe.entities.*;
import com.picafe.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

   // private static final log log = log.getlog(OrderServiceImpl.class.getName());

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private Customerrepo customerRepository;
    @Autowired
    private OrderItemsRepo orderItemsRepository;
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private ItemRepository itemRepository;

    @Override
    public OrderResponseDTO getOrdersForToday(Long storeId) {
        // Get the current date
        LocalDate currentDate = LocalDate.now();

        // Convert LocalDate to Date with time set to start and end of day
        LocalDateTime startOfDay = currentDate.atStartOfDay();
        LocalDateTime endOfDay = currentDate.atTime(23, 59, 59);

        Date startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endOfDay.atZone(ZoneId.systemDefault()).toInstant());

        log.info("Fetching orders for the current date: {} and store ID: {}", currentDate, storeId);
        List<Order> orders = orderRepository.findByOrderDateAndStore(startDate, endDate, storeId);

        List<OrderResponseDTO.OrderDTO> orderDTOs = orders.stream()
                .map(order -> {
                    OrderResponseDTO.OrderDTO orderDTO = new OrderResponseDTO.OrderDTO();
                    orderDTO.setOrderId(order.getOrderId());
                    orderDTO.setItems(order.getOrderItems().stream().map(orderItem -> {
                        OrderResponseDTO.ItemDTO itemDTO = new OrderResponseDTO.ItemDTO();
                        itemDTO.setId(orderItem.getItem().getId());
                        itemDTO.setQuantity(orderItem.getQuantity());
                        return itemDTO;
                    }).collect(Collectors.toList()));
                    orderDTO.setTotal(order.getPrice());
                    return orderDTO;
                })
                .collect(Collectors.toList());

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrders(orderDTOs);
        log.info("Orders fetched successfully.");
        return responseDTO;
    }


    @Override
    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        log.info("Creating order for customer: {}", orderRequest.getName());
        validateOrderRequest(orderRequest);

        try {
            // Retrieve or create the customer
            Customer customer = getOrCreateCustomer(orderRequest);

            // Retrieve the store
            Store store = storeRepository.findById(orderRequest.getStoreId())
                    .orElseThrow(() -> new EntityNotFoundException("Store not found"));

            // Create the order entity
            Order order = new Order();
            order.setCustomer(customer);
           // order.setOrder_date(orderRequest.getOrder_date());

            order.setOrderDate(orderRequest.getDate());
            log.info("Fetching orders date: " + orderRequest.getDate() + " and store ID: " + orderRequest.getStoreId());


            order.setPrice(orderRequest.getPrice());
            order.setOrderMode(orderRequest.getOrderMode());
            order.setStore(store);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = sdf.format(new Date());
            Date date = sdf.parse(dateString);
            order.setRecordUpdatedAt(date);



            // Create and set up the order items
            List<OrderItem> orderItems = createOrderItems(orderRequest, order);

            // Set the order items in the order entity
            order.setOrderItems(orderItems);

            // Save the order (and cascade the persist operation to order items)
            Order savedOrder = orderRepository.save(order);

            // Check if savedOrder is null
            if (savedOrder == null) {
                String message = "Order could not be saved.";
                log.error(message);
                throw new IllegalArgumentException(message);
            }

            log.info("Order creation complete for order ID: {}", savedOrder.getOrderId());
            return savedOrder;
        } catch (Exception e) {
            log.error("Error occurred while creating order: {}", e.getMessage());
            throw new IllegalArgumentException("Error occurred while creating order", e);
        }
    }


    private Customer getOrCreateCustomer(OrderRequest orderRequest) throws ParseException {
      //  String customerEmail = orderRequest.getEmail();
        Customer existingCustomer = customerRepository.findByEmail(orderRequest.getEmail());
        if (!ObjectUtils.isEmpty(existingCustomer)) {
            log.info("Customer already exists with email: {}", orderRequest.getEmail());
            return existingCustomer;
        }
            // New customer, set joining date
            Customer customer = new Customer();
            customer.setEmail(orderRequest.getEmail());
            customer.setName(orderRequest.getName());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = sdf.format(orderRequest.getDate());
            Date date = sdf.parse(dateString);
            customer.setCustomerjoinindate(date);
            customer = customerRepository.save(customer);
            log.info("New customer created with email: {}", orderRequest.getEmail());

        return customer;
    }

    private List<OrderItem> createOrderItems(OrderRequest orderRequest, Order order) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (Map.Entry<Long, Long> entry : orderRequest.getItems().entrySet()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(entry.getValue());
            // Retrieve the item by id (assuming you have an item repository)
            Item item = itemRepository.findById(entry.getKey())
                    .orElseThrow(() -> new EntityNotFoundException("Item not found"));
            orderItem.setItem(item);
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }
        return orderItems;
    }


    private void validateOrderRequest(OrderRequest orderRequest) {

        Map<Long,Long> map = orderRequest.getItems();
        if(map == null || map.isEmpty()) {
            String message= "Map can't be empty";
            log.error(message);
            throw new IllegalArgumentException(message);
        }

        // jlkdhsjkfhsh@te.tes.com

    }
}
