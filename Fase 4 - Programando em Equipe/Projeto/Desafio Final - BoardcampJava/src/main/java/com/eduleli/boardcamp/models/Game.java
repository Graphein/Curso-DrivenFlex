package com.eduleli.boardcamp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "games")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    private String image;
    @Column(nullable = false)
    private Integer stockTotal;
    @Column(nullable = false)
    private Integer pricePerDay; 
}
