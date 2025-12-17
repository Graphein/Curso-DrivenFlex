package com.eduleli.boardcamp.repositories;

import com.eduleli.boardcamp.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByCpf(String cpf);
}
