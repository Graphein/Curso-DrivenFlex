package com.eduleli.boardcamp.dtos.rental;

import com.eduleli.boardcamp.dtos.customer.CustomerResponseDTO;
import com.eduleli.boardcamp.dtos.game.GameResponseDTO;

import java.time.LocalDate;

public record RentalResponseDTO(
        Long id,
        LocalDate rentDate,
        Integer daysRented,
        LocalDate returnDate,
        Integer originalPrice,
        Integer delayFee,
        CustomerResponseDTO customer,
        GameResponseDTO game
) {}
