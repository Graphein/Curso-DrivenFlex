package com.eduardoleli.feirinha.domain;

import jakarta.persistence.*;

@Entity
@Table(
    name = "items",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_item_name", columnNames = "name")
    }
)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer quantity;

    public Item() {}

    public Item(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public Item(Long id, String name, Integer quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    // GETTERS e SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
