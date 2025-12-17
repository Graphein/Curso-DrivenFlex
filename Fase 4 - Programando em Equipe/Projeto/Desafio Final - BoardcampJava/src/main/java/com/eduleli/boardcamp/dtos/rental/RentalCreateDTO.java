package com.eduleli.boardcamp.dtos.rental;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RentalCreateDTO(
        @NotNull Long customerId,
        @NotNull Long gameId,
        @NotNull @Min(1) Integer daysRented
) {}
