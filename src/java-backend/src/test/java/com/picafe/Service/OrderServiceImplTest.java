//package com.picafe.Service;
//
//import com.picafe.dto.OrderRequest;
//import com.picafe.entities.*;
//import com.picafe.repository.*;
//import com.picafe.service.OrderServiceImpl;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//public class OrderServiceImplTest {
//
//    @Mock
//    private Customerrepo customerRepository;
//
//    @Mock
//    private OrderItemsRepo orderItemsRepository;
//
//    @Mock
//    private OrderRepository orderRepository;
//
//    @Mock
//    private StoreRepository storeRepository;
//
//    @Mock
//    private ItemRepository itemRepository;
//
//    @InjectMocks
//    private OrderServiceImpl orderService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
////    @Test
////    void createOrder_newCustomer_savesCustomerAndOrder() {
////        // Arrange
////        OrderRequest orderRequest = new OrderRequest();
////        orderRequest.setName("Rahul Sharma");
////        orderRequest.setId(2L);
////        orderRequest.setDate(new Date());
////        orderRequest.setPrice(100L);
////        orderRequest.setOrderMode("online delivery");
////        orderRequest.setStoreId(1L);
////        Map<Long, Long> items = new HashMap<>();
////        items.put(4L, 2L);
////        items.put(5L, 1L);
////        orderRequest.setItems(items);
////
////        Store mockStore = new Store();
////        when(customerRepository.existsByid(2L)).thenReturn(false);
////        when(customerRepository.save(any(Customer.class))).thenAnswer(i -> i.getArguments()[0]);
////        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);
////        when(storeRepository.findById(1L)).thenReturn(Optional.of(mockStore));
////        when(itemRepository.findById(4L)).thenReturn(Optional.of(new Item()));
////        when(itemRepository.findById(5L)).thenReturn(Optional.of(new Item()));
////
////        // Act
////        Order result = orderService.createOrder(orderRequest);
////
////        // Assert
////        ArgumentCaptor<Customer> customerCaptor = ArgumentCaptor.forClass(Customer.class);
////        verify(customerRepository).save(customerCaptor.capture());
////        Customer savedCustomer = customerCaptor.getValue();
////        assertEquals(2L, savedCustomer.getId());
////        assertEquals("Rahul Sharma", savedCustomer.getName());
////
////        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
////        verify(orderRepository).save(orderCaptor.capture());
////        Order savedOrder = orderCaptor.getValue();
////        assertEquals(2L, savedOrder.getCustomer().getId());
////        assertEquals(100L, savedOrder.getPrice());
////        assertEquals("online delivery", savedOrder.getOrderMode());
////
////        assertEquals(2, savedOrder.getOrderItems().size());
////        verify(orderItemsRepository, times(2)).save(any(OrderItem.class));
////    }
//
////    @Test
////    void createOrder_existingCustomer_savesOrder() {
////        // Arrange
////        OrderRequest orderRequest = new OrderRequest();
////        orderRequest.setName("John Doe");
////        orderRequest.setId(2L);
////        orderRequest.setDate(new Date());
////        orderRequest.setPrice(100L);
////        orderRequest.setOrderMode("online delivery");
////        orderRequest.setStoreId(1L);
////        Map<Long, Long> items = new HashMap<>();
////        items.put(4L, 2L);
////        items.put(5L, 1L);
////        orderRequest.setItems(items);
////
////        Customer existingCustomer = new Customer();
////        existingCustomer.setId(2L);
////        existingCustomer.setName("John Doe");
////
////        Store mockStore = new Store();
////        when(customerRepository.existsByid(2L)).thenReturn(true);
////        when(customerRepository.findById(2L)).thenReturn(Optional.of(existingCustomer));
////        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);
////        when(storeRepository.findById(1L)).thenReturn(Optional.of(mockStore));
////        when(itemRepository.findById(4L)).thenReturn(Optional.of(new Item()));
////        when(itemRepository.findById(5L)).thenReturn(Optional.of(new Item()));
////
////        // Act
////        Order result = orderService.createOrder(orderRequest);
////
////        // Assert
////        verify(customerRepository, never()).save(any(Customer.class));
////
////        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
////        verify(orderRepository).save(orderCaptor.capture());
////        Order savedOrder = orderCaptor.getValue();
////        assertEquals(2L, savedOrder.getCustomer().getId());
////        assertEquals(100L, savedOrder.getPrice());
////        assertEquals("online delivery", savedOrder.getOrderMode());
////
////        assertEquals(2, savedOrder.getOrderItems().size());
////        verify(orderItemsRepository, times(2)).save(any(OrderItem.class));
////    }
//
//    @Test
//    void createOrder_customerNotFound_throwsException() {
//        // Arrange
//        OrderRequest orderRequest = new OrderRequest();
//        orderRequest.setName("John Doe");
//        orderRequest.setId(2L);
//        orderRequest.setDate(new Date());
//        orderRequest.setPrice(25L);
//        orderRequest.setOrderMode("delivery");
//        orderRequest.setStoreId(1L);
//        Map<Long, Long> items = new HashMap<>();
//        items.put(4L, 2L);
//        items.put(5L, 1L);
//        orderRequest.setItems(items);
//
//        Store mockStore = new Store();
//        when(customerRepository.existsByid(2L)).thenReturn(false);
//        when(storeRepository.findById(1L)).thenReturn(Optional.of(mockStore));
//        when(itemRepository.findById(4L)).thenReturn(Optional.of(new Item()));
//        when(itemRepository.findById(5L)).thenReturn(Optional.of(new Item()));
//
//        // Act & Assert
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            orderService.createOrder(orderRequest);
//        });
//        assertEquals("Error occurred while creating order", exception.getMessage());
//    }
//}
