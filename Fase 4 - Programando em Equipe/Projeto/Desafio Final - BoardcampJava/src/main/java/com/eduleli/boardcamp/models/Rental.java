package com.eduleli.boardcamp.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "rentals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @ManyToOne(optional = false)
    @JoinColumn(name = "game_id")
    private Game game;
    @Column(nullable = false)
    private LocalDate rentDate;
    @Column(nullable = false)
    private Integer daysRented;
    private LocalDate returnDate; 
    @Column(nullable = false)
    private Integer originalPrice; 
    @Column(nullable = false)
    private Integer delayFee; 
}
