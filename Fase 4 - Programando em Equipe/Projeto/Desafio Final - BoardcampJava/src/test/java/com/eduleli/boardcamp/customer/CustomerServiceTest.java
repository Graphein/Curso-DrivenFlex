package com.eduleli.boardcamp.customer;

import com.eduleli.boardcamp.dtos.customer.CustomerCreateDTO;
import com.eduleli.boardcamp.exceptions.ConflictException;
import com.eduleli.boardcamp.exceptions.NotFoundException;
import com.eduleli.boardcamp.models.Customer;
import com.eduleli.boardcamp.repositories.CustomerRepository;
import com.eduleli.boardcamp.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CustomerServiceTest {

    CustomerRepository repo = Mockito.mock(CustomerRepository.class);
    CustomerService service = new CustomerService(repo);

    @Test
    void shouldCreateCustomer() {
        CustomerCreateDTO dto = new CustomerCreateDTO("João", "11999999999", "12345678910");

        when(repo.existsByCpf(dto.cpf())).thenReturn(false);
        when(repo.save(any())).thenReturn(new Customer(1L, "João", "11999999999", "12345678910"));

        var result = service.create(dto);

        assertEquals("João", result.name());
    }

    @Test
    void shouldThrowConflictWhenCpfExists() {
        CustomerCreateDTO dto = new CustomerCreateDTO("João", "11999999999", "12345678910");

        when(repo.existsByCpf(dto.cpf())).thenReturn(true);

        assertThrows(ConflictException.class, () -> service.create(dto));
    }

    @Test
    void shouldThrowNotFoundIfCustomerDoesNotExist() {
        when(repo.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> service.findById(99L));
    }
}
