package com.picafe.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OrderRequest {

    private Map<Long, Long> items;
    private Long price;
    private String orderMode;
    private String name;
    // this is customer id
    private String email;
    private Long storeId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    private Date date;
}
