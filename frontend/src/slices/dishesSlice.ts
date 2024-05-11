import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "@/types/types";

interface DishesState {
    dishes: {
        [category: string]: IProduct[]
    };
    currentPage: {
        [category: string]: number
    };
    totalPage: {
        [category: string]: number
    };
    fetching: {
        [category: string]: boolean
    };
    category: number;
}

const initialState: DishesState = {
    dishes: {},
    currentPage: {},
    totalPage: {},
    fetching: {},
    category: 0,
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialState,
    reducers: {
        setDishes: (state, action: PayloadAction<IProduct[]>) => {
            if (state.dishes.hasOwnProperty(state.category)) {
                state.dishes[state.category] = [...state.dishes[state.category], ...action.payload];
            } else {
                state.dishes[state.category] = [...action.payload];
            }
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
                state.currentPage[state.category] = action.payload;
        },
        setTotalPage: (state, action: PayloadAction<number>) => {
            state.totalPage[state.category] = action.payload;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.fetching[state.category] = action.payload;
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        clearState: (state) => {
            state.dishes = {};
            state.currentPage = {}
            state.fetching[state.category] = true;
        }
    },
})

export const {setDishes, setCurrentPage, setTotalPage, setFetching, setCategory, clearState} = dishesSlice.actions;

export default dishesSlice.reducer;