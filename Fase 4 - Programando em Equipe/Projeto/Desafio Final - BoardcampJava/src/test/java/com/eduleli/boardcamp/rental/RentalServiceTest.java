package com.eduleli.boardcamp.rental;

import com.eduleli.boardcamp.dtos.rental.RentalCreateDTO;
import com.eduleli.boardcamp.exceptions.NotFoundException;
import com.eduleli.boardcamp.exceptions.UnprocessableEntityException;
import com.eduleli.boardcamp.models.Customer;
import com.eduleli.boardcamp.models.Game;
import com.eduleli.boardcamp.models.Rental;
import com.eduleli.boardcamp.repositories.CustomerRepository;
import com.eduleli.boardcamp.repositories.GameRepository;
import com.eduleli.boardcamp.repositories.RentalRepository;
import com.eduleli.boardcamp.services.RentalService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RentalServiceTest {

    RentalRepository rentalRepo = Mockito.mock(RentalRepository.class);
    CustomerRepository customerRepo = Mockito.mock(CustomerRepository.class);
    GameRepository gameRepo = Mockito.mock(GameRepository.class);

    RentalService service = new RentalService(rentalRepo, customerRepo, gameRepo);

    @Test
    void shouldThrowNotFoundWhenCustomerDoesNotExist() {
        RentalCreateDTO dto = new RentalCreateDTO(1L, 1L, 3);

        when(customerRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> service.create(dto));
    }

    @Test
    void shouldThrowUnprocessableWhenGameHasNoStock() {
        RentalCreateDTO dto = new RentalCreateDTO(1L, 1L, 3);

        when(customerRepo.findById(1L)).thenReturn(Optional.of(new Customer()));
        when(gameRepo.findById(1L)).thenReturn(Optional.of(new Game(null, "Detetive", "img", 1, 1000)));
        when(rentalRepo.countByGameAndReturnDateIsNull(any())).thenReturn(1L);

        assertThrows(UnprocessableEntityException.class, () -> service.create(dto));
    }

    @Test
    void shouldFinishRentalWithDelayFee() {
        Customer c = new Customer(1L, "João", "11999999999", "12345678910");
        Game g = new Game(1L, "Detetive", "img", 3, 1500);

        Rental r = new Rental(
                1L,
                c, g,
                LocalDate.now().minusDays(5),
                3,
                null,
                4500,
                0
        );

        when(rentalRepo.findById(1L)).thenReturn(Optional.of(r));
        when(rentalRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        var result = service.finishRental(1L);

        assertTrue(result.delayFee() > 0);
    }
}
