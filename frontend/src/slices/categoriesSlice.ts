import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductCategory} from "@/types/types";

interface CategoriesState {
    categories: IProductCategory[];
}

const initialState: CategoriesState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<IProductCategory[]>) => {
                state.categories = [...action.payload];
        }
    },
})

export const {setCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;