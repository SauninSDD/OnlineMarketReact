package ru.sber.backend.clients.restaurants;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

@FeignClient(value = "feignDishes", url = "http://localhost:8081/dishes")
public interface RestaurantServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/any", produces = "application/json")
    List<?> getListAllDish();

}

