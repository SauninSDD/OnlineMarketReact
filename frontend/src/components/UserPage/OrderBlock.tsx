import {Button, Card, Modal, message, Steps} from 'antd';
import React, {FC, useState} from 'react';
import {IOrderFromHistory} from '../../types/types';
import TextArea from 'antd/es/input/TextArea';
import OrderService from '../../services/orderService';
import {useAppDispatch} from '../../hooks'
import './styles/OrderBlock.css';
import {
    DollarOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
    CarOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
interface OrderBlockProps {
    order: IOrderFromHistory;
}

/**
 * Блок с информацией о заказе
 * @constructor
 */
const OrderBlock: FC<OrderBlockProps> = ({order}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (cancelReason) {
            const orderId = order.id;

            OrderService
                .cancelOrder(orderId, cancelReason, dispatch)
                .then(() => {
                    setIsModalVisible(false);
                    message.success('Заказ успешно отменен');
                })
                .catch((error) => {
                    message.error('Ошибка при отмене заказа: ' + error.message);
                });
        } else {
            message.error('Введите причину отмены заказа');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const getStatusText = (status: string) => {
        switch (status) {
            case 'NOT_PAID':
                return 'Ожидает оплаты';
            case 'REVIEW':
                return 'Ожидает подтверждение';
            case 'COOKING':
                return 'Готовится';
            case 'COOKED':
                return 'Приготовлен';
            case 'CANCELLED':
                return 'Отменен';
            case 'DELIVERY':
                return 'В доставке';
            case 'COMPLETED':
                return 'Завершен';
            default:
                return 'Статус неизвестен';
        }
    };

    const getStatusIndex = (status: string) => {
        const orderStatuses = ['NOT_PAID', 'REVIEW', 'COOKING', 'DELIVERY', 'COMPLETED'];
        if (status=='COOKED') return orderStatuses.indexOf('COOKING');
        return orderStatuses.indexOf(status);
    };

    return (
        <div className="orderBlock">
            <Card hoverable className="orderBlock__card">
                <div className="orderBlock__card-content">
                    <p className="orderBlock__card-number">Номер заказа: {order.id}</p>
                    <p className="orderBlock__card-info">Адрес: {order.address}, кв. {order.flat}, этаж {order.floor}, подъезд {order.frontDoor}</p>
                    <p className="orderBlock__card-info">Дата и время заказа: {order.orderTime}</p>

                    <div className="orderBlock__status-bar">
                        <Steps current={getStatusIndex(order.status)}>
                            <Steps.Step className={`status-step ${order.status === 'NOT_PAID' ? 'completed' : ''}`} icon={<DollarOutlined />} />
                            <Steps.Step className={`status-step ${order.status === 'REVIEW' ? 'completed' : ''}`} icon={<ClockCircleOutlined />} />
                            <Steps.Step
                                className={`status-step ${order.status === 'COOKED' || order.status === 'COOKING' ? 'completed' : ''}`}
                                icon={order.status === 'COOKING' ?  <LoadingOutlined /> : <CheckCircleOutlined />}
                            />
                            <Steps.Step className={`status-step ${order.status === 'DELIVERY' ? 'completed' : ''}`} icon={<CarOutlined />} />
                            <Steps.Step className={`status-step ${order.status === 'COMPLETED' ? 'completed' : ''}`} icon={<CheckCircleOutlined />} />
                        </Steps>
                    </div>

                    <div className="orderBlock__card_status">
                        <span className="orderBlock__card-status-text">{getStatusText(order.status)}</span>
                    </div>

                    <p className="orderBlock__card-title">Блюда:</p>
                    <ul className="orderBlock__card-dishes">
                        {order.listDishesFromOrder.map((dish) => (
                            <li className="orderBlock__card-dish" key={dish.dishId}>
                                <span className="orderBlock__card-dish-name">{dish.dishName}</span> х {dish.quantity}
                            </li>
                        ))}
                    </ul>

                    <span className="orderBlock__card-cost">
          Стоимость: {order.totalPrice} ₽
        </span>

                    {order.status === 'COMPLETED' || order.status === 'CANCELLED' ? (
                        <p></p>
                    ) : (
                        <div className="orderBlock__cancel-button">
                            <Button style={{ backgroundColor: '#b24344' }} type="primary" onClick={showModal}>
                                Отменить заказ
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            <Modal
                title="Причина отмены заказа"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TextArea
                    placeholder="Введите причину отмены заказа"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                />
            </Modal>
        </div>
    );

};

export {OrderBlock};
