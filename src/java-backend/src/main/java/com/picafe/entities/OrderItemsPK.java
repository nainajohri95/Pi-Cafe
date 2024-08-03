package com.picafe.entities;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
public class OrderItemsPK implements Serializable {

    private Long order;
    private Long item;

    public OrderItemsPK() {
    }

    public OrderItemsPK(Long order, Long item) {
        this.order = order;
        this.item = item;
    }

    // Getters, setters, equals, and hashCode methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemsPK that = (OrderItemsPK) o;
        return Objects.equals(order, that.order) &&
                Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, item);
    }

    public Long getOrder() {
        return order;
    }

    public void setOrder(Long order) {
        this.order = order;
    }

    public Long getItem() {
        return item;
    }

    public void setItem(Long item) {
        this.item = item;
    }
}
