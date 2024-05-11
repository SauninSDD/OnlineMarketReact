import axios from "axios";
import { setDishes} from "@/slices/dishesSlice";
import {AppDispatch} from "@/store";
import i18n from "i18next";

const API_URL: string = "/Broomstick/products";

/**
 * Запрос для получения меню ресторана
 * @constructor
 */
const getDishes = (categoryId: number, size: number, page: number, dispatch: AppDispatch) => {
    const language = i18n.resolvedLanguage
    //TODO поменять на добавление квери-параметров через buildQuery
    return axios.get(`${API_URL}/searchByCategory?page=${page}&size=${size}&categoryId=${categoryId}&language=${language}`).then(
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

const DishService = {
    getDishes,
};

export default DishService