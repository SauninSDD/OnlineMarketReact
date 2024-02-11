import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDish} from "@/types/types";

interface DishesState {
    dishes: IDish[];
    currentPage: number;
    totalPage: number;
    fetching: boolean;
}

const initialState: DishesState = {
    dishes: [],
    currentPage: 0,
    totalPage: 1,
    fetching: true,
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialState,
    reducers: {
        setDishes: (state, action: PayloadAction<IDish[]>) => {
            state.dishes = [...state.dishes, ...action.payload];
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPage: (state, action: PayloadAction<number>) => {
            state.totalPage = action.payload;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching = action.payload;
        },
    },
})

export const {setDishes, setCurrentPage, setTotalPage, setFetching} = dishesSlice.actions;

export default dishesSlice.reducer;