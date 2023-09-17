import {createSlice} from "@reduxjs/toolkit";

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        dishes: [],
    },
    reducers: {
        setDishes: (state, action) => {
            state.dishes = action.payload;
        }
    },
})

export const {setDishes} = dishesSlice.actions;

export default dishesSlice.reducer;