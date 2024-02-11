import axios from "axios";
import { setDishes} from "../slices/dishesSlice";
import {AppDispatch} from "../store";

const API_URL: string = "/dishes";

/**
 * Запрос для получения меню ресторана
 * @constructor
 */
const getDishes = (size: number, page: number, dispatch: AppDispatch) => {
    return axios.get(`${API_URL}/any?page=${page}&size=${size}`).then(
        (response) => {
            console.log(response.data)
            console.log('Total Pages Dishes:', response.headers['x-total-pages']);
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