package com.picafe.service;

import java.util.Date;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.picafe.dto.FeedbackRequest;
import com.picafe.dto.FeedbackResponse;
import com.picafe.entities.CustomerFeedback;
import com.picafe.entities.Order;
import com.picafe.repository.CustomerFeedbackRepository;
import com.picafe.repository.OrderRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private static final Logger logger = Logger.getLogger(FeedbackServiceImpl.class.getName());

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerFeedbackRepository feedbackRepository;

    @Override
    public FeedbackResponse submitFeedback(FeedbackRequest feedbackRequest) throws Exception {
        Optional<Order> orderOpt = orderRepository.findById(feedbackRequest.getOrderId());
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            CustomerFeedback feedback = new CustomerFeedback();
            feedback.setOrder(order);

            feedback.setFoodrating(feedbackRequest.getRatings().getFoodrating());
            feedback.setCustomerexprating(feedbackRequest.getRatings().getCustomerexprating());
            feedback.setAmbiancerating(feedbackRequest.getRatings().getAmbiancerating());
            feedbackRepository.save(feedback);

            FeedbackResponse response = new FeedbackResponse("Feedback submitted successfully", feedbackRequest.getOrderId(), feedbackRequest.getRatings());
            logger.info("Feedback submitted successfully for order ID: " + feedbackRequest.getOrderId());
            return response;
        } else {
            logger.warning("Order with specified ID not found: " + feedbackRequest.getOrderId());
            throw new Exception("Order with specified ID not found");
        }
    }
}
