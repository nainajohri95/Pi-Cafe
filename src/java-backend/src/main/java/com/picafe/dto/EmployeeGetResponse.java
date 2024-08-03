package com.picafe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeGetResponse {

        private Long employee_id;
        private String name;
        private Float salary;
        private String position;

}
