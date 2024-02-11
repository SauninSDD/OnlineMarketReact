import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrderFromHistory} from "@/types/types";


interface OrderState {
    orders: IOrderFromHistory[];
}

const initialState: OrderState = {
    orders: [],
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<IOrderFromHistory[]>) => {
            state.orders = action.payload;
        },

    },
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;