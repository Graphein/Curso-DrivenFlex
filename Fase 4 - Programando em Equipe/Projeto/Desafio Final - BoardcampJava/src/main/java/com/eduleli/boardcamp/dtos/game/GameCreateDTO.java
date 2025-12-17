package com.eduleli.boardcamp.dtos.game;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GameCreateDTO(
        @NotBlank String name,
        String image,
        @NotNull @Min(1) Integer stockTotal,
        @NotNull @Min(1) Integer pricePerDay
) {}
