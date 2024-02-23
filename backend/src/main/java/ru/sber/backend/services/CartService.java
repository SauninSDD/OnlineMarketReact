package ru.sber.backend.services;

import ru.sber.backend.entities.product.Product;

import java.util.List;

public interface CartService {
    List<Product> getProductsFromCart(); //в реализации делаю поиск корзины по id клиента

    boolean addProductInCart(Long productId); //в реализации делаю поиск корзины по id клиента и в неё добавление

    boolean updateProductQuantityFromCart(Long productId, int clientCartProductQuantity);//в реализации делаю поиск корзины по id клиента и в ней изменяю кол-во

    boolean deleteProductFromCart(Long productId);
}
