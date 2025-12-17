package com.eduleli.boardcamp.rental;

import com.eduleli.boardcamp.dtos.rental.RentalCreateDTO;
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
public class RentalControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @Test
    void shouldListRentals() throws Exception {
        mvc.perform(get("/rentals"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn400OnInvalidRental() throws Exception {
        RentalCreateDTO dto = new RentalCreateDTO(null, null, 0);

        mvc.perform(post("/rentals")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturn404WhenFinishingUnknownRental() throws Exception {
        mvc.perform(post("/rentals/999/return"))
                .andExpect(status().isNotFound());
    }
}
