package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Сущность добавки к блюду
 */
@Data
@Table(name = "additives")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Additive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String name;

    private double weight;

    private String description;

    private String ingredients;

    @OneToMany(mappedBy = "additive", cascade = CascadeType.ALL)
    private List<Dish> dishes;
}
