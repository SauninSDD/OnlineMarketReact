import React, {FC} from 'react';
import CardDish from './CardDish';
import {IProduct} from "@/types/types";

interface ListDishes {
    dishes: IProduct[];
}

/**
 * Список карточек блюд в меню
 * @constructor
 */
const ListDishes: FC<ListDishes> =
    ({
         dishes
     }) => {

        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
                flexWrap: "wrap",
                height: "400"
            }}>
                {dishes.map((dish) =>
                    <CardDish dish={dish} key={dish.id} showUseButton={true}/>
                )}
            </div>
        );
    };

export default ListDishes;