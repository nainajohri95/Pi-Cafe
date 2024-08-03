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
@Table(name = "stores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="store_id")
    private Long storeId;
    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Location location;
    @Column(name="name")
    private String name;
    @Column(name="manager_id")
    private Long managerid;
    @Column(name="\"Fixed_cost\"")
    private Float fixedcost;
    @Column(name = "\"Maintenance_cost\"")
    private Float maintenancecost;
    @Column(name="making_cost_modifier")
    private Float makingcostmodifier;
    @Column(name="\"State\"")
    private String state;
    @Column(name="\"City\"")
    private String city;
    @Temporal(TemporalType.DATE)
    @Column(name="\"Opening_date\"")
    private Date openingdate;
    @Column(name="\"Record_current_status\"")
    @Builder.Default
    private String recordcurrentstatus="Active";
    @Column(name="\"Record_updated_by\"")
    @Builder.Default
    private String recordupdatedby="System";
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="\"Record_updated_at\"")
    @Builder.Default
    private Date recordupdatedate=new Date();
    @Temporal(TemporalType.DATE)
    @Column(name="\"Record_end_date\"")
    private Date recordenddate = Date.from(LocalDate.of(2074, 12, 31).atStartOfDay(ZoneId.systemDefault()).toInstant());

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Employee> employees;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

//    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<CustomerFeedback> customerFeedbacks;
}


