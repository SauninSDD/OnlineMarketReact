import {createSlice} from "@reduxjs/toolkit";

export const additivesSlice = createSlice({
    name: 'additives',
    initialState: {
        additives: [],
    },
    reducers: {
        setAdditives: (state, action) => {
            state.additives = action.payload;
        }
    },
})

export const {setAdditives} = additivesSlice.actions;

export default additivesSlice.reducer;