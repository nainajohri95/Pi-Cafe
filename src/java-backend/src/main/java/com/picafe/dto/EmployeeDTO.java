package com.picafe.dto;

import com.picafe.entities.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private Long employee_id;
    private String name;
    private String position;
    private Long store_id;
}

