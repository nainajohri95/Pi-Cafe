package com.picafe.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer_feedback")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feedback_id")
    private Long feedbackid;

    @OneToOne
    @JoinColumn(name = "\"Order_id\"")
    private Order order;

//    @ManyToOne
//    @JoinColumn(name = "store_id")
//    private Store store;

    @Column(name="food_rating")
    private Long foodrating;
    @Column(name="customer_exp_rating")
    private Long customerexprating;
    @Column(name="ambiance_rating")
    private Long ambiancerating;
}
