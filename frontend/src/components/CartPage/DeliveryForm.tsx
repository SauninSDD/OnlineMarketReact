import React, {FC} from 'react';
import { Form, Input, InputNumber} from 'antd';
import TextArea from "antd/es/input/TextArea";
import PhoneInput from "react-phone-input-2";
import {
    IDeliveryInfo,
    IDishFromCart,
    IDishFromOrderResponse,
    IOrderResponse,
} from "../../types/types";
import {user} from "../../constants/constants";
import OrderService from "../../services/orderService";
import {useAppDispatch} from "../../hooks";
import Payment from "./Payment";

interface DeliveryForm {
    listDishesFromCart: IDishFromCart[];
    totalPrice: number;
}

/**
 * Форма с указанием данных для доставки
 * @constructor
 */
const DeliveryForm: FC<DeliveryForm> = ({
                                            listDishesFromCart,
                                            totalPrice,
                                        }) => {
    const [form] = Form.useForm<IDeliveryInfo>();
    const dispatch = useAppDispatch();
    const totalWeight: number = listDishesFromCart.reduce(
        (accumulator: number, item: IDishFromCart | undefined) =>
            accumulator + (item?.weight ?? 0) * (item?.quantity ?? 0), 0
    );

    const listDishesFromOrder: IDishFromOrderResponse[] = listDishesFromCart.map((dish: IDishFromCart) => {
        return {
            dishId: dish.id,
            dishName: dish.name,
            quantity: dish.quantity,
        }
    })

    const onFinish = () => {
        let order: IOrderResponse = {
            ...form.getFieldsValue(),
            clientId: user?.id ?? 0,
            totalPrice: totalPrice,
            weight: totalWeight,
            listDishesFromOrder: listDishesFromOrder
        };
        OrderService.createOrder(order, dispatch).then((orderId) => {
            OrderService.paymentOfOrderById(orderId)
        })
        alert("Заказ совершен")
    };


    return (
        <div className="cartPage--content--delivery">
            <h2>Информация о доставке</h2>
            <Form name="deliveryForm" form={form}>
                <Form.Item
                    label="Имя:"
                    name="clientName"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}
                >
                    <Input placeholder="Введите имя"/>
                </Form.Item>
                <Form.Item
                    label="Адрес:"
                    name="address"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш адрес!'}]}
                >
                    <Input
                        placeholder="Введите улицу и номер дома"
                    />
                </Form.Item>
                <Form.Item
                    label="Номер квартиры:"
                    name="flat"
                    rules={[{required: true, message: 'Пожалуйста, введите номер квартиры'}]}
                >
                    <InputNumber min={1} placeholder="Квартира"
                    />
                </Form.Item>
                <Form.Item
                    label="Этаж:"
                    name="floor"
                    rules={[{required: true, message: 'Пожалуйста, введите этаж'}]}
                >
                    <InputNumber min={1} placeholder="Этаж"
                    />
                </Form.Item>
                <Form.Item
                    label="Номер подъезда:"
                    name="frontDoor"
                    rules={[{required: true, message: 'Пожалуйста, введите номер подъезда'}]}
                >
                    <InputNumber min={1} placeholder="Подъезд"
                    />
                </Form.Item>
                <Form.Item
                    label="Телефон:"
                    name="clientPhoneNumber"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}]}
                >
                    <PhoneInput
                        country="ru"
                        onlyCountries={["ru"]}
                        placeholder="+7-xxx-xxx-xx-xx"
                    />
                </Form.Item>
                <Form.Item
                    label="Дополнительная информация:"
                    name="description"
                >
                    <TextArea
                        placeholder="Ваши пожелания"
                    />
                </Form.Item>
            </Form>

            <Payment totalPrice={totalPrice} onFinish={onFinish}/>

        </div>
    );
};

export default DeliveryForm;