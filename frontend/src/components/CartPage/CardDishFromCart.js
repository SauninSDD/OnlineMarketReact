import React from 'react';
import CardDish from "../DishesPage/CardDish";
import {Button, InputNumber} from "antd";
import {useDispatch} from "react-redux";
import {rewoveFromCart, updateAmount} from "../../slices/cartSlice";
import {CloseCircleOutlined} from "@ant-design/icons";

const CardDishFromCart = ({dish}) => {
    const dispatch = useDispatch();
    const handleUpdateAmount=(dishId,amount)=>{
        dispatch(updateAmount({dishId, amount}))
            }

    const handleRemoveClick = (dishId) => {
        dispatch(rewoveFromCart(dishId))
    }

    return (
        <div>
            <CardDish dish={dish}/>
            <InputNumber
                value={dish.amount}
                min={1}
                onChange={(amount) => handleUpdateAmount(dish.id,amount)}
            />
            <Button onClick={() => handleRemoveClick(dish.id)} type="text" icon={<CloseCircleOutlined />} />
        </div>
    );
};

export default CardDishFromCart;