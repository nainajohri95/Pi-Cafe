package com.picafe.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.picafe.dto.FeedbackRequest;
import com.picafe.dto.FeedbackResponse;
import com.picafe.service.FeedbackService;

@RestController
@RequestMapping("/picafepos/api/v1/orders")
public class FeedbackController {

    private static final Logger logger = Logger.getLogger(FeedbackController.class.getName());

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/feedback")
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        try {
            FeedbackResponse response = feedbackService.submitFeedback(feedbackRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Exception occurred while submitting feedback", e);
            if (e.getMessage().contains("Order with specified ID not found")) {
                return ResponseEntity.status(404).body("Order with specified ID not found");
            }
            return ResponseEntity.status(500).body("An error occurred while submitting feedback");
        }
    }
}
