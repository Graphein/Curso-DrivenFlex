package com.eduleli.boardcamp.services;

import com.eduleli.boardcamp.dtos.customer.CustomerCreateDTO;
import com.eduleli.boardcamp.dtos.customer.CustomerResponseDTO;
import com.eduleli.boardcamp.exceptions.ConflictException;
import com.eduleli.boardcamp.exceptions.NotFoundException;
import com.eduleli.boardcamp.models.Customer;
import com.eduleli.boardcamp.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerResponseDTO> listAll() {
        return customerRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public CustomerResponseDTO findById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Customer not found"));

        return toDTO(customer);
    }

    public CustomerResponseDTO create(CustomerCreateDTO dto) {
        if (customerRepository.existsByCpf(dto.cpf())) {
            throw new ConflictException("CPF already exists");
        }

        Customer customer = Customer.builder()
                .name(dto.name())
                .phone(dto.phone())
                .cpf(dto.cpf())
                .build();

        return toDTO(customerRepository.save(customer));
    }

    private CustomerResponseDTO toDTO(Customer c) {
        return new CustomerResponseDTO(
                c.getId(),
                c.getName(),
                c.getPhone(),
                c.getCpf()
        );
    }
}
