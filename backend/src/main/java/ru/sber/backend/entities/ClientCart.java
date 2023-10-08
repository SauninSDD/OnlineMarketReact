package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@Table(name = "clients_carts")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ClientCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column
    private int clientCartTotalPrice;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    @JsonIgnore
    private Client client;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "clients_carts_products",
            joinColumns = @JoinColumn(name = "id_cart"),
            inverseJoinColumns = @JoinColumn(name = "id_product"))
    private Set<Product> products = new HashSet<>();

    @Column
    private int clientCartProductValue;
    @Column
    private BigDecimal clientCartProductPrice;
}
