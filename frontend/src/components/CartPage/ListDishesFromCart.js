import React from 'react';
import CardDishFromCart from "./CardDishFromCart";
const ListDishesFromCart = ({dishes}) => {

    return (
        <div style={{display: "flex", flexWrap: "wrap", width: "800px"}}>
            {dishes.map((dish) =>
                <CardDishFromCart dish={dish} key={dish.id}/>
            )}

        </div>
    );
};

export default ListDishesFromCart;