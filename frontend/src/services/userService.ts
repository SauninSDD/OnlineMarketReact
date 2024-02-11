import axios from "axios";
import {setUser} from "../slices/userSlice";
import authHeader from "./auth-header";
import {AppDispatch} from "../store";
import {IUserResponse} from "../types/types";

const API_URL = "/clients";

/**
 * Запрос на получения инфомрации о пользователе
 * @constructor
 */
const getUser = (userId: number, dispatch: AppDispatch) => {
    return axios.get(API_URL + `/${userId}`, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data)
            dispatch(setUser(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setUser([]));
        });
};

/**
 * Запрос на обновление данных пользователя
 * @constructor
 */
const updateUser = (idUser: number, user: IUserResponse, dispatch: AppDispatch) => {
    console.log(`Обновление данных пользователя ${API_URL}/${idUser}`, user, {headers: authHeader()})
    return axios.put(`${API_URL}/${idUser}`, user, {headers: authHeader()}).then(
        () => {
            getUser(idUser, dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content)
        });
};

/**
 * Запрос на удаление пользователя
 * @constructor
 */
const deleteUser = (id: number, dispatch: AppDispatch) => {
    return axios.delete(API_URL + `/${id}`, {headers: authHeader()}).then(
        () => {
            getUser(id, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content)
        });
};

const userService = {
    getUser,
    updateUser,
    deleteUser,
};

export default userService
