package com.picafe.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
// import java.util.Locale.Category;

@Entity
@Table(name = "items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @Column(name="name")
    private String name;
    @Column(name="selling_cost")
    private Float sellingcost;
    @Column(name="making_cost")
    private Float makingcost;
    @Temporal(TemporalType.DATE)
    @Column(name="launch_date")
    private Date launchdate;

    @Column(name="\"Record_current_status\"")
    @Builder.Default
    private String recordcurrentstatus="Active";
    @Column(name="\"Record_updated_by\"")
    @Builder.Default
    private String recordupdatedby="System";
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="\"Record_updated_at\"")
    @Builder.Default
    private Date recordupdatedat=new Date();
    @Temporal(TemporalType.DATE)
    @Column(name="\"Record_end_date\"")
    private Date recordenddate = Date.from(LocalDate.of(2074, 12, 31).atStartOfDay(ZoneId.systemDefault()).toInstant());

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

}
