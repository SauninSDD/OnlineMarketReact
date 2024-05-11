import axios from "axios";
import {AppDispatch} from "@/store";
import {setCategories} from "@/slices/categoriesSlice";

const API_URL: string = "/Broomstick/categories";

/**
 * Запрос для получения списка категорий
 * @constructor
 */
const getCategories = (language: string, dispatch: AppDispatch) => {
    return axios.get(`${API_URL}/getCategories?language=${language}`).then(
        (response) => {
            console.log('Категории: ', response.data)
            dispatch(setCategories(response.data));
        },
        (error) => {
            const _content = (error?.response && error?.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setCategories([]));
        });
};

const CategoryService = {
    getCategories,
};

export default CategoryService