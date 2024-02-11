import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import {addMinutes, format} from 'date-fns';
import './styles/Payment.css';

interface PaymentProps {
    totalPrice: number;
    onFinish: () => void;
}

/**
 * Форма для оплаты
 * @constructor
 */
const Payment: FC<PaymentProps> =
    ({
         totalPrice,
         onFinish,
     }) => {
        const [checkBoxOffer, setCheckBoxOffer] = useState<boolean>(true);
        const currentTime: Date = new Date();
        const deliveryTime: Date = addMinutes(currentTime, 60);
        const formattedTime: string = format(deliveryTime, 'HH:mm');


        useEffect(() => {
            const cartTotal: Element | null = document.querySelector('.cartPage__total');
            if (cartTotal) {
                if (!checkBoxOffer) {
                    cartTotal.classList.add('cartPage-total-hidden');
                } else {
                    cartTotal.classList.remove('cartPage-total-hidden');
                }
            }
        }, [checkBoxOffer]);


        return (
            <div>
                <div className="cartPage--content--payment">
                    <h2>Оплата</h2>
                    <Checkbox
                        checked={checkBoxOffer}
                        onChange={() => {
                            setCheckBoxOffer(!checkBoxOffer);
                        }}
                    >
                        Соглашаюсь на распространение указанных в заказе персональных данных третьим лицам. С
                        условиями{' '}
                        <Link to={'https://p.finance/pdf/offer_ru.pdf'}>Публичной оферты</Link> ознакомлен.
                    </Checkbox>
                    {!checkBoxOffer && (
                        <div>
                            <span
                                style={{color: 'red'}}>Необходимо подтвердить согласие с условиями публичной оферты</span>
                        </div>
                    )}
                    <h4>Доставим до: {formattedTime}</h4>
                    <h3>К оплате: {totalPrice} ₽</h3>

                    <Button type="primary" onClick={onFinish}>
                        Оплатить
                    </Button>
                </div>
            </div>
        );
    };

export default Payment;