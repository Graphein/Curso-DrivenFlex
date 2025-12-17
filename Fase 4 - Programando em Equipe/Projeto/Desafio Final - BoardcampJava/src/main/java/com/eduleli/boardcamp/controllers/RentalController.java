package com.eduleli.boardcamp.controllers;

import com.eduleli.boardcamp.dtos.rental.RentalCreateDTO;
import com.eduleli.boardcamp.dtos.rental.RentalResponseDTO;
import com.eduleli.boardcamp.services.RentalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping
    public List<RentalResponseDTO> listRentals() {
        return rentalService.listAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RentalResponseDTO createRental(@RequestBody @Valid RentalCreateDTO dto) {
        return rentalService.create(dto);
    }

    @PostMapping("/{id}/return")
    public RentalResponseDTO finishRental(@PathVariable Long id) {
        return rentalService.finishRental(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRental(@PathVariable Long id) {
        rentalService.deleteRental(id);
    }
}
