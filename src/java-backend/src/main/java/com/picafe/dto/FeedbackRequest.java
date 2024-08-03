package com.picafe.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest {
    private Long orderId;
    private Ratings ratings;
    @Data
    public static class Ratings {
        private Long foodrating;
        private Long customerexprating;
        private Long ambiancerating;
    }

}
