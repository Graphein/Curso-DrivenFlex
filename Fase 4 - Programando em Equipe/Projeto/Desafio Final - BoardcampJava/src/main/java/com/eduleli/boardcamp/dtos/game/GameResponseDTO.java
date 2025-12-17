package com.eduleli.boardcamp.dtos.game;

public record GameResponseDTO(
        Long id,
        String name,
        String image,
        Integer stockTotal,
        Integer pricePerDay
) {}
