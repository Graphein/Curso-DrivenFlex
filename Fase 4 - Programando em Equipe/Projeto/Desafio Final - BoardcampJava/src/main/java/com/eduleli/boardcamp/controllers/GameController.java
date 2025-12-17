package com.eduleli.boardcamp.controllers;

import com.eduleli.boardcamp.dtos.game.GameCreateDTO;
import com.eduleli.boardcamp.dtos.game.GameResponseDTO;
import com.eduleli.boardcamp.services.GameService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<GameResponseDTO> listGames() {
        return gameService.listAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GameResponseDTO createGame(@RequestBody @Valid GameCreateDTO dto) {
        return gameService.create(dto);
    }
}
