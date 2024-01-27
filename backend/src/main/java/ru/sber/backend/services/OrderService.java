package ru.sber.backend.services;

import ru.sber.backend.entities.Order;
import ru.sber.backend.entities.enums.EOrderStatus;

import java.util.Date;
import java.util.List;

public interface OrderService {
    Long addOrder(Order order);

    Order getMeasure(Long id);

    List<Order> getAllOrders();

    List<Order> getOrdersByClientId(Long clientId);

    List<Order> getOrdersByStatus(EOrderStatus orderStatus);

    List<Order> getOrdersByDate(Date orderDate); //2 метода реализации (сортировка от большего к меньшему и наоборот)

    Order getOrderByTrackNumber(String orderTrackNumber);

    boolean changeOrderStatus(Long orderId, EOrderStatus orderStatus);

    boolean deleteOrder(Long id);
}
