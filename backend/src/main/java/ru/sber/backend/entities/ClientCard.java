package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Table(name = "clients_cards")
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class ClientCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientCardNumber;

    @Column(nullable = false)
    private int clientCardCvc;

    @Column(nullable = false)
    private Date clientCardExpirationDate;

    @Column(nullable = false)
    private int clientCardOwner;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    @JsonIgnore
    private Client client;

}
