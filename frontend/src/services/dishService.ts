import axios from "axios";
import { setDishes} from "@/slices/dishesSlice";
import {AppDispatch} from "@/store";

const API_URL: string = "/Broomstick/products";

/**
 * Запрос для получения меню ресторана
 * @constructor
 */
const getDishes = (category: string, size: number, page: number, dispatch: AppDispatch) => {
    return axios.get(`${API_URL}?page=${page}&size=${size}&category=${category}`).then(
        (response) => {
            console.log('Total Pages Dishes:', response.headers['x-total-pages']);
            console.log(response.data)
            dispatch(setDishes(response.data));
            return response;
        },
        (error) => {
            const _content = (error?.response && error?.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setDishes([]));
        });
};

const dishService = {
    getDishes,
};

export default dishService