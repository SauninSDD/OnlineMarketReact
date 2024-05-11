import axios from "axios";
import {ILogin, IRegistration, IUser, ITokens} from "@/types/types";
import authHeader from "./auth-header";
import {Dispatch} from "redux";
import {login, setUserData} from "@/slices/authSlice";
import {AppDispatch} from "@/store";

const API_URL = "/Broomstick/api/auth";

/**
 * Запрос для регистрации пользователя
 * @constructor
 */
const register = (registration: IRegistration) => {
    const { username, number, birthdate, email, password } = registration;
    return axios.post(API_URL + "/signup", {
        username,
        number,
        birthdate,
        email,
        password,
    });
};

/**
 * Запрос для аутентификации пользователя
 * @constructor
 */
const loginUser = async (loginData: ILogin, dispatch: Dispatch) => {
    const { username, password } = loginData;

    let response = await axios.post(API_URL + "/signin", {
            username,
            password,
        })
    console.log(response);
    dispatch(login());
    const {access_token, refresh_token} = response.data;

    if (access_token && refresh_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return fetchUserDetails(dispatch);
};

const refresh = async (refreshToken: String, dispatch: Dispatch): Promise<IUser> => {
    let response = await axios
        .post<ITokens>(API_URL + "/refresh", {
            refresh_token: refreshToken
        });
    console.log('Refresh', response)
    dispatch(login());

    const {access_token, refresh_token} = response.data;

    if (access_token && refresh_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return fetchUserDetails(dispatch);
};

const updateUser = async (user: IUser, dispatch: AppDispatch) => {
    const headers = authHeader();
    let response = await axios
        .put<IUser>(API_URL, user, {headers}).then(()=> {

        })
    console.log(response);
    console.log(`Обновление данных пользователя ${API_URL}}`, user, {headers: authHeader()})

    //TODO вынести логику с получением и парсом токена пользователя в отдельную функцию (в App дублируется)
    const userStr = localStorage.getItem("user");
    let userS = null;
    if (userStr) {
        userS = JSON.parse(userStr);
    }
    console.log(userStr);
    if (userS) {
        const refresh_token = userS.refresh_token;
        await refresh(refresh_token, dispatch)
    }
};

const fetchUserDetails = async (dispatch: Dispatch) => {
    const headers = authHeader();
    try {
        const response = await axios.get<IUser>(API_URL, { headers });
        console.log('fetchUserDetailsResponse', response)
        dispatch(setUserData(response.data));
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

/**
 * Выход из аккаунта пользователя
 * @constructor
 */
const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
};

const AuthService = {
    register,
    loginUser,
    logout,
    updateUser,
    refresh
};

export default AuthService;