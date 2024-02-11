import {user} from "../constants/constants";
import header from "../components/generals/Header";

/**
 * Аутентификационный заголовок
 * @constructor
 */
export default function authHeader() {

    const userStr = sessionStorage.getItem("user");
    console.log("header: " + userStr)
    let user = null;
    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return { Authorization: '' };
    }
}