import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILanguages, IUser} from "@/types/types";
import {user} from "@/constants/constants";

interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
    languages: ILanguages;
}

const initialState: AuthState = {
    isLoggedIn: Boolean(user),
    user: undefined,
    languages: {
        ru: {nativeName: 'Русский'},
        en: {nativeName: 'English'}
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        }
    },
})

export const {login, logout, setUserData} = authSlice.actions

export default authSlice.reducer