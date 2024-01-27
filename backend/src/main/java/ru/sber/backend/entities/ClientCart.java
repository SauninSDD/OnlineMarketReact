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
    @Column(name = "id_cart")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private BigDecimal clientCartTotalPrice;

    @Column
    private int clientCartProductValue;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    @JsonIgnore
    private Client client;

    @OneToMany(mappedBy = "clientCart", cascade = CascadeType.ALL)
    private Set<CartProduct> productsInCart = new HashSet<>();


}
