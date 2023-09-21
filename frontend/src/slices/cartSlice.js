import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        addProduct: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem){
                existingItem.amount++;
            } else {
                state.items.push(
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        category: action.payload.category,
                        price: action.payload.price,
                        weight: action.payload.weight,
                        description: action.payload.description,
                        urlImage: action.payload.urlImage,
                        amount: 1,
                    }
                );
            }
        },
        updateAmount: (state, action) => {
            const {dishId, amount}  = action.payload;
            const item = state.items.find((item) => item.id === dishId);
            if (item) {
                item.amount = amount;
            }
        },
        rewoveFromCart: (state,action) => {
            state.items = state.items.filter(element => element.id !== action.payload);
        },
    }

});

export const {setCart, addProduct,updateAmount,rewoveFromCart} = cartSlice.actions;
export default cartSlice.reducer;