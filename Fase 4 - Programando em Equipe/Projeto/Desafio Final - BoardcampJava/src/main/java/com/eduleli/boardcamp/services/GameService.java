package com.eduleli.boardcamp.services;

import com.eduleli.boardcamp.dtos.game.GameCreateDTO;
import com.eduleli.boardcamp.dtos.game.GameResponseDTO;
import com.eduleli.boardcamp.exceptions.ConflictException;
import com.eduleli.boardcamp.models.Game;
import com.eduleli.boardcamp.repositories.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<GameResponseDTO> listAll() {
        return gameRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public GameResponseDTO create(GameCreateDTO dto) {
        if (gameRepository.existsByNameIgnoreCase(dto.name())) {
            throw new ConflictException("Game name already exists");
        }

        Game game = Game.builder()
                .name(dto.name())
                .image(dto.image())
                .stockTotal(dto.stockTotal())
                .pricePerDay(dto.pricePerDay())
                .build();

        Game saved = gameRepository.save(game);
        return toDTO(saved);
    }

    private GameResponseDTO toDTO(Game game) {
        return new GameResponseDTO(
                game.getId(),
                game.getName(),
                game.getImage(),
                game.getStockTotal(),
                game.getPricePerDay()
        );
    }
}
