import React, {useState, useEffect, FC} from 'react';
import ListDishesFromCart from '../components/CartPage/ListDishesFromCart';
import DeliveryForm from '../components/CartPage/DeliveryForm';
import CartService from "../services/cartService";
import './styles/CartPage.css';
import { IDishFromCart} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks";

/**
 * Страница корзины пользователя
 * @constructor
 */
const CartPage: FC = () => {
        const listDishesFromCart: IDishFromCart[] = useAppSelector((state) => state.cart.cartItems);
        const isCartEmpty: boolean = listDishesFromCart.length === 0;
        const dispatch = useAppDispatch();

        const totalPrice: number = listDishesFromCart.reduce(
            (accumulator: number, item: IDishFromCart | undefined) =>
                accumulator + (item?.price ?? 0) * (item?.quantity ?? 0), 0
        );

        const [isTotalVisible, setIsTotalVisible] = useState<boolean>(true);

        useEffect(() => {
            const getCart = () => {
                CartService.getCart(dispatch)
            };
            getCart();
        }, []);

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            if (windowHeight + scrollTop >= pageHeight - 10) {
                setIsTotalVisible(false);
            } else {
                setIsTotalVisible(true);
            }
        };

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <div className="cartPage">
                <div className="cartPage--content">
                    <h2 className="cartPage--content--title-cart">Корзина</h2>
                    {isCartEmpty ? (
                        <div className={"cartEmpty"}>
                            <h2 className="cartPage--content--title-cartIsEmpty">Ваша корзина пуста :(</h2>
                            <div className={"cartEmpty__images__container"}><img
                                className="cartPage-img-empty"
                                src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                                alt="Гифка танцующего грузина"
                            />
                                <img
                                    className="cartPage-img-empty"
                                    src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                                    alt="Гифка танцующего грузина"
                                    style={{transform: 'scaleX(-1)'}}
                                /></div>
                        </div>
                    ) : (
                        <div>
                            <div className="border-bottom-container"><ListDishesFromCart dishes={listDishesFromCart}/></div>
                                <DeliveryForm listDishesFromCart={listDishesFromCart}
                                              totalPrice={totalPrice}/>
                        </div>
                    )}
                </div>
                {isTotalVisible && !isCartEmpty && (
                    <div className="cartPage-total">
                        <h4 className="cartPage-total-title-count">К оплате: {totalPrice} ₽</h4>
                    </div>
                )}
            </div>
        );
    }

;

export default CartPage;