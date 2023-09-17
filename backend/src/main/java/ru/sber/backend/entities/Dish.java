package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Сущность блюда
 */
@Data
@Table(name = "dishes")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    private Category category;

    private double price;

    private double weight;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "additive_id")
    private Additive additive;

    private String urlImage;

}
