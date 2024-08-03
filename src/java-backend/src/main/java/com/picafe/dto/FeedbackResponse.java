package com.picafe.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse {
    private String message;
    private Long order_id;
    private FeedbackRequest.Ratings ratings;
}
