package com.picafe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_seq")
    @SequenceGenerator(name="order_seq", sequenceName = "order_seq", allocationSize = 1, initialValue = 49821)
    @Column(name="order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name="price")
    private Long price;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")

    private Date orderDate;

    @Column(name = "order_mode")
    private String orderMode;

    @Column(name = "\"Record_current_status\"")
    @Builder.Default
    private String recordCurrentStatus="Active";

    @Column(name = "\"Record_updated_by\"")
    @Builder.Default
    private String recordUpdatedBy = "System";

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "\"Record_updated_at\"")
    @Builder.Default
    private Date recordUpdatedAt = new Date();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CustomerFeedback customerFeedback;
}
