package com.picafe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Calendar;
import java.util.Date;

@Entity
@Table(name = "employees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
    @SequenceGenerator(name="emp_seq", sequenceName = "emp_seq", allocationSize = 1, initialValue = 129)
    @Column(name="employee_id")
    private Long employeeid;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name="name")
    private String name;
    @Column(name="password")
    private String password;
    @Column(name="salary")
    private Float salary;
    @Column(name="position")
    private String position;
    @Temporal(TemporalType.DATE)
    @Column(name="\"Joining_date\"")
    @Builder.Default
    private Date joiningDate=new Date();
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
    private Date recordenddate;

    @PrePersist
    @PreUpdate
    private void setRecordEndDate() {
        if (this.recordupdatedate != null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(this.recordupdatedate);
            cal.add(Calendar.YEAR, 50);
            this.recordenddate = cal.getTime();
        }
    }

}
