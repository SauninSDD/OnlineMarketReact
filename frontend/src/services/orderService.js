import axios from "axios";
import {setOrders} from "../slices/ordersSlice";
import authHeader from "./auth-header";

const API_URL = "/orders";

const getOrders = (dispatch) => {
    return axios.get(API_URL).then(
        (response) => {
            dispatch(setOrders(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setOrders([]));
        });

};

const createOrder = (order, dispatch) => {

    return axios.post(API_URL, order, {headers: authHeader()}).then(
        (response) => {
            getOrders(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateOrder = (order, dispatch) => {
    return axios.put(API_URL, order, {headers: authHeader()}).then(
        (response) => {
            getOrders(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteOrder = (id, dispatch) => {
    return axios.delete(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            getOrders(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const orderService = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};

export default orderService