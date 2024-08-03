package com.picafe.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private List<OrderDTO> orders;

    @Data
    public static class OrderDTO {
        private Long orderId;
        private List<ItemDTO> items;
        private Long total;
    }

    @Data
    public static class ItemDTO {
        private Long id;
        private Long quantity;
    }
}
