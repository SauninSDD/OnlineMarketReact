import axios from "axios";
import {setClients} from "../slices/сlientSlice";
import authHeader from "./auth-header";

const API_URL = "/clients";

const getClients = (dispatch) => {
    return axios.get(API_URL).then(
        (response) => {
            dispatch(setClients(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setClients([]));
        });

};

const createClient = (client, dispatch) => {

    return axios.post(API_URL, client, {headers: authHeader()}).then(
        (response) => {
            getClients(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateClient = (client, dispatch) => {
    return axios.put(API_URL, client, {headers: authHeader()}).then(
        (response) => {
            getClients(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteClient = (id, dispatch) => {
    return axios.delete(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            getClients(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const clientService = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
};

export default clientService