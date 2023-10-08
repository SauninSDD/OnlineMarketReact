package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "deliveries")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String deliveryDestinationRegion;

    private String deliveryDestinationCity;

    private String deliveryDestinationStreet;

    private String deliveryDestinationBuilding;

    @OneToOne
    @JoinColumn(name = "id_order", nullable = false)
    @JsonIgnore
    private Order order;
}
