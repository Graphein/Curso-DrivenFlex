package com.eduleli.boardcamp.controllers;

import com.eduleli.boardcamp.dtos.customer.CustomerCreateDTO;
import com.eduleli.boardcamp.dtos.customer.CustomerResponseDTO;
import com.eduleli.boardcamp.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<CustomerResponseDTO> listCustomers() {
        return customerService.listAll();
    }

    @GetMapping("/{id}")
    public CustomerResponseDTO getCustomer(@PathVariable Long id) {
        return customerService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponseDTO createCustomer(@RequestBody @Valid CustomerCreateDTO dto) {
        return customerService.create(dto);
    }
}
