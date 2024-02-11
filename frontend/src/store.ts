import {configureStore} from '@reduxjs/toolkit'
import dishesReducer from "./slices/dishesSlice";
import ordersReducer from "./slices/ordersSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

/**
 * Типизированное хранилище редьюсеров
 * @constructor
 */
export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        orders: ordersReducer,
        cart: cartReducer,
        auth: authReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch