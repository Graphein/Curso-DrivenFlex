package com.eduleli.boardcamp.customer;

import com.eduleli.boardcamp.dtos.customer.CustomerCreateDTO;
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
public class CustomerControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @Test
    void shouldListCustomers() throws Exception {
        mvc.perform(get("/customers"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreateCustomer() throws Exception {
        CustomerCreateDTO dto =
                new CustomerCreateDTO("Maria", "11988887777", "11122233344");

        mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldReturn400WhenInvalidCustomer() throws Exception {
        CustomerCreateDTO dto =
                new CustomerCreateDTO("", "abc", "123");

        mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}
