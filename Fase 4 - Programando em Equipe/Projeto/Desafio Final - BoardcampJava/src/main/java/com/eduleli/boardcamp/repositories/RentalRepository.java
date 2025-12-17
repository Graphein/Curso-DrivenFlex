package com.eduleli.boardcamp.repositories;

import com.eduleli.boardcamp.models.Game;
import com.eduleli.boardcamp.models.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long> {
    long countByGameAndReturnDateIsNull(Game game);
}
