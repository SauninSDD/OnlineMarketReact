import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILanguages, IUser} from "@/types/types";

interface UsersState {
    users: IUser[];
    languages: ILanguages;
}

const initialState: UsersState = {
    users: [],
    languages: {
        ru: {nativeName: 'Русский'},
        en: {nativeName: 'English'}
    },
};
export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action:PayloadAction<IUser[]>) => {
            state.users = action.payload;
        }
    },
})

export const {setUser} = UserSlice.actions;

export default UserSlice.reducer;