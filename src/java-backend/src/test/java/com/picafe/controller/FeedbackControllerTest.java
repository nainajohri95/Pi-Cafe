package com.picafe.controller;

import com.picafe.dto.FeedbackRequest;
import com.picafe.dto.FeedbackRequest.Ratings;
import com.picafe.dto.FeedbackResponse;
import com.picafe.service.FeedbackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class FeedbackControllerTest {

    @Mock
    private FeedbackService feedbackService;

    @InjectMocks
    private FeedbackController feedbackController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void submitFeedback_success() throws Exception {
        // Arrange
        FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setOrderId(1L);
        Ratings ratings = new Ratings();
        ratings.setFoodrating(5L);
        ratings.setCustomerexprating(5L);
        ratings.setAmbiancerating(5L);
        feedbackRequest.setRatings(ratings);

        FeedbackResponse mockFeedbackResponse = new FeedbackResponse();
        mockFeedbackResponse.setMessage("Feedback submitted successfully");

        when(feedbackService.submitFeedback(any(FeedbackRequest.class))).thenReturn(mockFeedbackResponse);

        // Act
        ResponseEntity<?> response = feedbackController.submitFeedback(feedbackRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockFeedbackResponse, response.getBody());
        verify(feedbackService).submitFeedback(any(FeedbackRequest.class));
    }

    @Test
    void submitFeedback_orderNotFound() throws Exception {
        // Arrange
        FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setOrderId(1L);
        Ratings ratings = new Ratings();
        ratings.setFoodrating(5L);
        ratings.setCustomerexprating(5L);
        ratings.setAmbiancerating(5L);
        feedbackRequest.setRatings(ratings);

        when(feedbackService.submitFeedback(any(FeedbackRequest.class)))
                .thenThrow(new IllegalArgumentException("Order with specified ID not found"));

        // Act
        ResponseEntity<?> response = feedbackController.submitFeedback(feedbackRequest);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Order with specified ID not found", response.getBody());
        verify(feedbackService).submitFeedback(any(FeedbackRequest.class));
    }

    @Test
    void submitFeedback_internalServerError() throws Exception {
        // Arrange
        FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setOrderId(1L);
        Ratings ratings = new Ratings();
        ratings.setFoodrating(5L);
        ratings.setCustomerexprating(5L);
        ratings.setAmbiancerating(5L);
        feedbackRequest.setRatings(ratings);

        when(feedbackService.submitFeedback(any(FeedbackRequest.class)))
                .thenThrow(new RuntimeException("Unexpected error"));

        // Act
        ResponseEntity<?> response = feedbackController.submitFeedback(feedbackRequest);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while submitting feedback", response.getBody());
        verify(feedbackService).submitFeedback(any(FeedbackRequest.class));
    }
}
