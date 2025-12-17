package com.eduleli.boardcamp.game;

import com.eduleli.boardcamp.dtos.game.GameCreateDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class GameControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @Test
    void shouldReturn200OnGetGames() throws Exception {
        mvc.perform(get("/games"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn201OnCreateGame() throws Exception {
        GameCreateDTO dto = new GameCreateDTO("Banco Imobiliário", "img", 3, 1500);

        mvc.perform(post("/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldReturn400WhenSendingInvalidGame() throws Exception {
        GameCreateDTO dto = new GameCreateDTO("", "img", 0, 0);

        mvc.perform(post("/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}
