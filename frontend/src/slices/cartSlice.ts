import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IDishFromCart} from "@/types/types";

interface CartState {
    cartItems: IDishFromCart[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<IDishFromCart[]>) => {
            state.cartItems = action.payload;
        },
    }

});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;