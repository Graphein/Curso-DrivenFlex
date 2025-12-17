package com.eduleli.boardcamp.repositories;

import com.eduleli.boardcamp.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    boolean existsByNameIgnoreCase(String name);

    Optional<Game> findByNameIgnoreCase(String name);
}