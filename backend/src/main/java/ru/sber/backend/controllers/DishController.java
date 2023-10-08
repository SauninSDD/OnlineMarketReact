package ru.sber.backend.controllers;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.clients.restaurants.RestaurantServiceClient;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/dishes")
public class DishController {

    private final RestaurantServiceClient restaurantServiceClient;

    @Autowired
    public DishController(RestaurantServiceClient restaurantServiceClient) {
        this.restaurantServiceClient = restaurantServiceClient;
    }

    /**
     * Получает список всех блюд ресторана
     *
     * @return получение списка блюд
     */
    @GetMapping("/any")
    public ResponseEntity<List<?>> getDishes() {
        List<?> listDishes = restaurantServiceClient.getListAllDish();

        return ResponseEntity.ok().body(listDishes);
    }

}
