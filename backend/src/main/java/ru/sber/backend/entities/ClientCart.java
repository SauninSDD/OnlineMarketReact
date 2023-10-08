package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "clients_carts")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ClientCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


}
