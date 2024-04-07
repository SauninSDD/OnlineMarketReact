import {Space} from 'antd';
import React, {FC, useEffect} from 'react';
import { IOrderFromHistory} from '../../types/types';
import {OrderBlock} from './OrderBlock';
import './styles/OrderHistory.css';
import OrderService from "../../services/orderService";
import {useAppDispatch} from "../../hooks";
import {useTranslation} from "react-i18next";

interface OrderHistory {
    listOrdersFromHistory: IOrderFromHistory[];
}

/**
 * Вкладка с историей заказов пользователя
 * @constructor
 */
const OrderHistory: FC<OrderHistory> =
    ({listOrdersFromHistory}) => {
        const {t} = useTranslation('UserPage');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getCart = () => {
            OrderService.getOrders(dispatch)
        };
        getCart();
    }, []);

        return (
            <div className={"orderHistory"}>
                {listOrdersFromHistory.length > 0 ? (
                    <Space direction="horizontal" size="large" wrap>
                        {listOrdersFromHistory.sort((n1: IOrderFromHistory, n2: IOrderFromHistory) => n2.id - n1.id).map((order) => (
                            <OrderBlock
                                order={order}
                                key={order.clientId}
                            />
                        ))}
                    </Space>
                ) : (
                    <div>{t('notHistoryOrder')}</div>
                )}
            </div>
        );
    };

export default OrderHistory;
