package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * Заказ с ограниченной информацией
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private long id;
    private String clientId;
    private String clientName;
    private String clientPhoneNumber;
    private String orderTime;
    private BigDecimal totalPrice;
    private Integer weight;
    private String description;
    private String address;
    private Integer flat;
    private Integer floor;
    private Integer frontDoor;
    private String status;
//    private List<DishOrder> listDishesFromOrder;

}
