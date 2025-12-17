package com.eduleli.boardcamp.dtos.customer;

public record CustomerResponseDTO(
        Long id,
        String name,
        String phone,
        String cpf
) {}
