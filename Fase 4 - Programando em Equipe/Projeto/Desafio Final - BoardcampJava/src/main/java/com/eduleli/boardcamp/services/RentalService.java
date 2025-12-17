package com.eduleli.boardcamp.services;

import com.eduleli.boardcamp.dtos.customer.CustomerResponseDTO;
import com.eduleli.boardcamp.dtos.game.GameResponseDTO;
import com.eduleli.boardcamp.dtos.rental.RentalCreateDTO;
import com.eduleli.boardcamp.dtos.rental.RentalResponseDTO;
import com.eduleli.boardcamp.exceptions.BadRequestException;
import com.eduleli.boardcamp.exceptions.NotFoundException;
import com.eduleli.boardcamp.exceptions.UnprocessableEntityException;
import com.eduleli.boardcamp.models.Customer;
import com.eduleli.boardcamp.models.Game;
import com.eduleli.boardcamp.models.Rental;
import com.eduleli.boardcamp.repositories.CustomerRepository;
import com.eduleli.boardcamp.repositories.GameRepository;
import com.eduleli.boardcamp.repositories.RentalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final CustomerRepository customerRepository;
    private final GameRepository gameRepository;

    public RentalService(RentalRepository rentalRepository,
                         CustomerRepository customerRepository,
                         GameRepository gameRepository) {
        this.rentalRepository = rentalRepository;
        this.customerRepository = customerRepository;
        this.gameRepository = gameRepository;
    }

    public List<RentalResponseDTO> listAll() {
        return rentalRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }
    public RentalResponseDTO create(RentalCreateDTO dto) {

        Customer customer = customerRepository.findById(dto.customerId())
                .orElseThrow(() -> new NotFoundException("Customer not found"));

        Game game = gameRepository.findById(dto.gameId())
                .orElseThrow(() -> new NotFoundException("Game not found"));

        long openRentals = rentalRepository.countByGameAndReturnDateIsNull(game);

        if (openRentals >= game.getStockTotal()) {
            throw new UnprocessableEntityException("No stock available for this game");
        }

        LocalDate rentDate = LocalDate.now();
        int originalPrice = dto.daysRented() * game.getPricePerDay();

        Rental rental = Rental.builder()
                .customer(customer)
                .game(game)
                .rentDate(rentDate)
                .daysRented(dto.daysRented())
                .returnDate(null)
                .originalPrice(originalPrice)
                .delayFee(0)
                .build();

        Rental saved = rentalRepository.save(rental);
        return toDTO(saved);
    }

    public RentalResponseDTO finishRental(Long id) {

        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rental not found"));

        if (rental.getReturnDate() != null) {
            throw new UnprocessableEntityException("Rental already finished");
        }

        LocalDate today = LocalDate.now();
        rental.setReturnDate(today);

        long totalDays = ChronoUnit.DAYS.between(rental.getRentDate(), today);
        long delayDays = totalDays - rental.getDaysRented();

        int delayFee = 0;

        if (delayDays > 0) {
            delayFee = (int) delayDays * rental.getGame().getPricePerDay();
        }

        rental.setDelayFee(delayFee);

        Rental updated = rentalRepository.save(rental);
        return toDTO(updated);
    }


    public void deleteRental(Long id) {

        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Rental not found"));

        if (rental.getReturnDate() == null) {
            throw new BadRequestException("Cannot delete an open rental");
        }

        rentalRepository.delete(rental);
    }
    private RentalResponseDTO toDTO(Rental r) {

        Customer c = r.getCustomer();
        Game g = r.getGame();

        CustomerResponseDTO customerDTO = new CustomerResponseDTO(
                c.getId(),
                c.getName(),
                c.getPhone(),
                c.getCpf()
        );

        GameResponseDTO gameDTO = new GameResponseDTO(
                g.getId(),
                g.getName(),
                g.getImage(),
                g.getStockTotal(),
                g.getPricePerDay()
        );

        return new RentalResponseDTO(
                r.getId(),
                r.getRentDate(),
                r.getDaysRented(),
                r.getReturnDate(),
                r.getOriginalPrice(),
                r.getDelayFee(),
                customerDTO,
                gameDTO
        );
    }
}
