import {Space} from "antd";
import React, {FC, useEffect} from "react";
import './styles/DeliveryCard.css';
import {IOrderFromHistory} from "../../types/types";
import {OrderBlock} from "./OrderBlock";
import OrderService from "../../services/orderService";
import {useAppDispatch} from "../../hooks";
import {useTranslation} from "react-i18next";

interface CurrentOrders {
    listOfCurrentOrders: IOrderFromHistory[];
}

/**
 * Вкладка с текущими заказами пользователя
 * @constructor
 */
const CurrentOrders: FC<CurrentOrders> = ({listOfCurrentOrders}) => {
    const {t} = useTranslation('UserPage');
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getCart = () => {
            OrderService.getOrders(dispatch)
        };
        getCart();
    }, []);
    return (
        <div className={"deliveryCard"}>
            {listOfCurrentOrders.length > 0 ? (
                <Space direction="horizontal" size="large" wrap>
                    {listOfCurrentOrders.map((order) => (
                        <OrderBlock
                            order={order}
                            key={order.id}
                        />
                    ))}
                </Space>
            ) : (
                <div>{t('notCurrentOrder')}</div>
            )}
        </div>
    );
};

export default CurrentOrders;