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
@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name="name")
    private String name;

    @Temporal(TemporalType.DATE)
    @Column(name="\"Launch_date\"")
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
    private Date recordupdatedate=new Date();
    @Temporal(TemporalType.DATE)
    @Column(name="\"Record_end_date\"")
    @Builder.Default
    private Date recordenddate = Date.from(LocalDate.of(2074, 12, 31).atStartOfDay(ZoneId.systemDefault()).toInstant());
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Item> items;
}




