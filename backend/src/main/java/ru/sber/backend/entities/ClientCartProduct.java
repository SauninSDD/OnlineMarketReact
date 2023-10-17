package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Embeddable
@Table(name = "clients_carts_products")
@Data
@NoArgsConstructor
public class ClientCartProduct {
    @Id
    @Column(name = "id_client_cart_product")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cart")
    private ClientCart clientCart;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @Column
    private byte clientCartProductValue;

    @Column
    private int clientCartProductPrice;


}
