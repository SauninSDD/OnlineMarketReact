import {createSlice} from "@reduxjs/toolkit";

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        dishes: [
            {
                id: 1,
                name: "Баварская ",
                category: "Pizza",
                price: 200,
                weight: 15.4,
                description: "Томатный соус, сыр моцарелла, салями, ветчина, курица, шампиньоны, помидор, сладкий перец, сушёный базилик",
                urlImage: "https://cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/3/bavarskaya-bolshaya-main_image-3441-96931.jpg",
            },
            {
                id: 2,
                name: "Маргарита ",
                category: "Пицца",
                price: 200,
                weight: 15.4,
                description: "Томатный соус, сыр моцарелла, салями, ветчина, курица, шампиньоны, помидор, сладкий перец, сушёный базилик",
                urlImage: "https://cdpiz1.pizzasoft.ru/rs/600x600/pizzafab/items/3/margarita-bolshaya-main_image-3587-77377.jpg",
            },
            {
                id: 3,
                name: "Золотая рыбка ",
                category: "Pizza",
                price: 2003,
                weight: 15.4,
                description: "Томатный соус, сыр моцарелла, салями, ветчина, курица, шампиньоны, помидор, сладкий перец, сушёный базилик",
                urlImage: "https://cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/3/zolotaya-rybka-bolshaya-main_image-3553-82345.jpg",
            },
            {
                id: 4,
                name: "Итальянское ассорти",
                category: "Pizza",
                price: 2030,
                weight: 15.4,
                description: "Томатный соус, сыр моцарелла, салями, ветчина, курица, шампиньоны, помидор, сладкий перец, сушёный базилик",
                urlImage: "https://cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/3/italyanskoe-assorti-bolshaya-main_image-3562-74986.jpg",
            },
        ],
    },
    reducers: {
        /*setDishes: (state, action) => {
            state.dishes = action.payload;
        }*/
    },
})

export const {setDishes} = dishesSlice.actions;

export default dishesSlice.reducer;