package com.picafe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="email")
    private String email;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="customer_joining_date")
    private Date customerjoinindate;
    @Temporal(TemporalType.DATE)
    @Column(name="\"Record_end_date\"")
    private Date recordenddate = Date.from(LocalDate.of(2074, 12, 31).atStartOfDay(ZoneId.systemDefault()).toInstant());
    @Column(name="\"Record_current_status\"")
    @Builder.Default
    private String recordcurrentstatus="Active";

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

}
