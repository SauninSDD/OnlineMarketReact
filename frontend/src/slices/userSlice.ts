import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser} from "../types/types";

interface UsersState {
    users: IUser[];
}

const initialState: UsersState = {
    users: [],
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