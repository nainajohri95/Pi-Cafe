package com.picafe.service;


import com.picafe.dto.FeedbackRequest;
import com.picafe.dto.FeedbackResponse;

public interface FeedbackService {
    FeedbackResponse submitFeedback(FeedbackRequest feedbackRequest) throws Exception;
}
