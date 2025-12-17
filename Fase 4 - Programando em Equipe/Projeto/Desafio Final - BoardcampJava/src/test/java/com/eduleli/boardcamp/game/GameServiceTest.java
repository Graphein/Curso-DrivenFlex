package com.eduleli.boardcamp.game;

import com.eduleli.boardcamp.dtos.game.GameCreateDTO;
import com.eduleli.boardcamp.exceptions.ConflictException;
import com.eduleli.boardcamp.models.Game;
import com.eduleli.boardcamp.repositories.GameRepository;
import com.eduleli.boardcamp.services.GameService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class GameServiceTest {

    GameRepository repo = Mockito.mock(GameRepository.class);
    GameService service = new GameService(repo);

    @Test
    void shouldListAllGames() {
        when(repo.findAll()).thenReturn(List.of(new Game()));

        var result = service.listAll();

        assertEquals(1, result.size());
    }

    @Test
    void shouldCreateGameSuccessfully() {
        GameCreateDTO dto = new GameCreateDTO("Detetive", "img", 3, 1500);

        when(repo.existsByNameIgnoreCase("Detetive")).thenReturn(false);
        when(repo.save(any())).thenReturn(new Game(1L, "Detetive", "img", 3, 1500));

        var result = service.create(dto);

        assertEquals("Detetive", result.name());
    }

    @Test
    void shouldThrowConflictWhenNameAlreadyExists() {
        GameCreateDTO dto = new GameCreateDTO("Uno", "img", 3, 1500);

        when(repo.existsByNameIgnoreCase("Uno")).thenReturn(true);

        assertThrows(ConflictException.class, () -> service.create(dto));
    }
}
