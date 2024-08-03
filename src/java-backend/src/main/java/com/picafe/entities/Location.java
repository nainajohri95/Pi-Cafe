package com.picafe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "locations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="regional_manager_name")
    private String regionalmanagername;
    @Column(name="\"Record_updated_by\"")
    @Builder.Default
    private String recordupdatedby="System";
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="\"Record_updated_at\"")
    @Builder.Default
    private Date recordupdatedate=new Date();

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Store> stores;
}
