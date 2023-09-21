import React from 'react';
import { useSelector} from "react-redux";
import ListDishesFromCart from "../components/CartPage/ListDishesFromCart";

const CartPage = () => {
    const listDishesFromCart = useSelector((state) => state.cart.items)
    return (
        <div>
            <h2>Страница корзины</h2>
            <ListDishesFromCart dishes={listDishesFromCart}/>
        </div>
    );
};

export default CartPage;