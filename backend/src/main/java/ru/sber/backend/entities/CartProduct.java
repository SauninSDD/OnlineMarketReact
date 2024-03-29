package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sber.backend.entities.client.ClientCart;
import ru.sber.backend.entities.product.Product;

import java.math.BigDecimal;

@Entity
@Embeddable
@Table(name = "clients_carts_products")
@Data
@NoArgsConstructor
public class CartProduct { //некорректный какой-то вроде класс вплане полей-сущностей
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
    private int cartProductQuantity;

    @Column
    private BigDecimal cartProductPrice;


}
