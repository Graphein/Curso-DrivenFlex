package com.eduardoleli.feirinha.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemRequest {

    @NotBlank(message = "name é obrigatório e não pode ser vazio")
    private String name;

    @NotNull(message = "quantity é obrigatório")
    @Min(value = 1, message = "quantity deve ser maior que 0")
    private Integer quantity;

    public ItemRequest() {}

    public ItemRequest(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    // GETTERS e SETTERS

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
