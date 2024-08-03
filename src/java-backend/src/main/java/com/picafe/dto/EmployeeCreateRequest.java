package com.picafe.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeCreateRequest {
    @NotNull(message = "Store Id is required field")
    private Long storeId; //this is store id
    @NotNull(message = "")
    private String name;
    @NotNull
    private String password;
    @NotNull
    private Float salary;
    @NotNull
    private String position;
    @NotNull
    private Long managerId;
}
