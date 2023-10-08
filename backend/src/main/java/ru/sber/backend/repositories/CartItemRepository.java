package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    /**
     * Получает список элементов корзины клиента
     *
     * @param cartId id корзины
     * @return список элементов корзины
     */
    List<CartItem> findByCartId(long cartId);

    /**
     * Удаляет блюдо из корзины
     *
     * @param cartId id корзины
     * @param dishId id блюда
     */
    void deleteCartItemByCartIdAndDishId(long cartId, long dishId);
}

