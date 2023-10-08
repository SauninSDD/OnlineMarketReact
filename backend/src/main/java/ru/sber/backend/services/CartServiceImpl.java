package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.backend.repositories.CartItemRepository;
import ru.sber.backend.repositories.CartRepository;
import ru.sber.backend.repositories.ClientRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final ClientRepository clientRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ClientRepository clientRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.clientRepository = clientRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public boolean addToCart(long cartId, long dishId) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(cartId);

        Cart shoppingCart = cart.orElseGet(() -> {
            Optional<User> user = clientRepository.findById(cartId);
            if (user.isPresent()) {
                Cart newCart = new Cart();
                newCart.setClient(user.get());
                return cartRepository.save(newCart);
            }

            return null;
        });

        if (shoppingCart != null) {
            Optional<CartItem> cartItem = shoppingCart.getCartItems().stream()
                    .filter(item -> item.getDishId() == dishId)
                    .findFirst();

            if (cartItem.isPresent()) {
                CartItem existingCartItem = cartItem.get();
                existingCartItem.setQuantity(1);
            } else {
                CartItem newCartItem = new CartItem();
                newCartItem.setCart(shoppingCart);
                newCartItem.setDishId(dishId);
                newCartItem.setQuantity(1);
                shoppingCart.getCartItems().add(newCartItem);
            }

            cartRepository.save(shoppingCart);
            return true;
        }

        return false;
    }


    @Override
    @Transactional
    public boolean deleteDish(long cartId, long dishId) {
        cartItemRepository.deleteCartItemByCartIdAndDishId(cartId, dishId);
        return true;
    }

    @Override
    public boolean updateDishAmount(long clientId, long dishId, int quantity) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(clientId);

        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            List<CartItem> cartItems = shoppingCart.getCartItems();

            for (CartItem cartItem : cartItems) {
                if (cartItem.getDishId() == dishId) {
                    cartItem.setQuantity(quantity);
                    cartRepository.save(shoppingCart);
                    return true;
                }
            }
        }

        return false;
    }

    @Override
    public void clearCart(long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(clientId);

        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            cartItemRepository.deleteAll(shoppingCart.getCartItems());
            cartRepository.delete(shoppingCart);
        }
    }

    @Override
    public List<Long> getListOfDishIdsInCart(long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(clientId);

        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            List<CartItem> cartItems = shoppingCart.getCartItems();
            List<Long> dishIds = new ArrayList<>();

            for (CartItem cartItem : cartItems) {
                dishIds.add(cartItem.getDishId());
            }

            return dishIds;
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<CartItem> getCartItemsByCartId(long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    @Override
    public int countDishesInCart(long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(clientId);

        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            List<CartItem> cartItems = shoppingCart.getCartItems();
            int totalQuantity = 0;

            for (CartItem cartItem : cartItems) {
                totalQuantity += cartItem.getQuantity();
            }

            return totalQuantity;
        } else {
            return 0;
        }
    }
}
