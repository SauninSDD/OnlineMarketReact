package ru.sber.backend.services;

import java.util.List;

public interface CartService {
    /**
     * Добавление блюда в корзину
     *
     * @param clientId Уникальный идентификатор пользователя
     * @param dishId   Уникальный идентификатор блюда
     * @return Возвращает статус добавления блюда в корзину
     */
    boolean addToCart(long clientId, long dishId);

    /**
     * Удаление блюда из корзины
     *
     * @param cartId   Уникальный идентификатор корзины
     * @param dishId   Уникальный идентификатор блюда
     * @return Возвращает статус удаления блюда из корзины
     */
    boolean deleteDish(long cartId, long dishId);

    /**
     * Изменение количества блюда в корзине
     *
     * @param clientId   Уникальный идентификатор пользователя
     * @param dishId     Уникальный идентификатор блюда
     * @param quantity   Количество добавляемого блюда
     * @return Возвращает статус обновления количества блюда в корзине
     */
    boolean updateDishAmount(long clientId, long dishId, int quantity);

    /**
     * Полностью очищает корзину пользователя
     *
     * @param clientId Уникальный идентификатор пользователя
     */
    void clearCart(long clientId);

    /**
     * Выдает список идентификаторов блюд в корзине пользователя
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает список идентификаторов блюд
     */
    List<Long> getListOfDishIdsInCart(long clientId);

    /**
     * Подсчитывает количество блюд в корзине пользователя
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает количество товаров
     */
    int countDishesInCart(long clientId);

    /**
     * Получает список элементов корзины клиента
     *
     * @param cartId id корзины
     * @return список элементов корзины
     */
    List<CartItem> getCartItemsByCartId(long cartId);
}
