package com.picafe.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeUpdateRequest {
    private String name;
    private String password;
    private Float salary;
    private Long manager_id;
}
