import axios from "axios";
import authHeader from "./auth-header";
import {setCart} from "../slices/cartSlice";
import {AppDispatch} from "../store";

const API_URL = "/cart";

/**
 * Запрос для получения корзины
 * @constructor
 */
const getCart = (dispatch: AppDispatch) => {

    return axios.get(API_URL, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data)
            dispatch(setCart(response.data))
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setCart([]));

        });
}

/**
 * Запрос для добавления блюда в корзину
 * @constructor
 */
const addToCart = (dishId: number, dispatch: AppDispatch) => {

    console.log(`Добавление товара ${API_URL}/dish/${dishId}`, {quantity: 1}, {headers: authHeader()})

    return axios.post(`${API_URL}/dish/${dishId}`, {quantity: 1}, {headers: authHeader()}).then(
        () => {
            getCart(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

/**
 * Запрос для обновления кол-ва блюд в корзине
 * @constructor
 */
const updateQuantity = (dishId: number, quantity: {
    quantity: number
}, dispatch: AppDispatch) => {
    console.log(`Обновление кол-ва ${API_URL}/dish/${dishId}`, quantity, {headers: authHeader()})
    return axios.put(`${API_URL}/dish/${dishId}`, quantity, {headers: authHeader()}).then(
        () => {
            getCart(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

/**
 * Запрос для удаления блюда из корзины
 * @constructor
 */
const deleteFromCart = (dishId: number, dispatch: AppDispatch) => {
    console.log(`Удаление ${API_URL}/dish/${dishId}`, {headers: authHeader()})
    return axios.delete(`${API_URL}/dish/${dishId}`, {headers: authHeader()}).then(
        () => {
            getCart(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const cartService = {
    getCart,
    addToCart,
    updateQuantity,
    deleteFromCart,
};

export default cartService