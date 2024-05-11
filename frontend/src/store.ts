import {configureStore} from '@reduxjs/toolkit'
import dishesReducer from "./slices/dishesSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ordersReducer from "./slices/ordersSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

/**
 * Типизированное хранилище редьюсеров
 * @constructor
 */
export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        cart: cartReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch