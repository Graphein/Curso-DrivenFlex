package com.eduleli.boardcamp.dtos.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CustomerCreateDTO(
        @NotBlank String name,

        @NotBlank
        @Size(min = 10, max = 11)
        @Pattern(regexp = "\\d+")
        String phone,

        @NotBlank
        @Size(min = 11, max = 11)
        @Pattern(regexp = "\\d+")
        String cpf
) {}
