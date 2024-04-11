import React, {FC, useEffect, useState} from 'react';
import {IUserResponse} from "@/types/types";
import Cookies from 'js-cookie';
import {Checkbox, Form, Input} from "antd";

interface UserInfoProps {
    user: IUserResponse | null; // уточняем тип для user
}

const UserInfo: FC<UserInfoProps> = ({user}) => {

    const [color, setColor] = useState(Cookies.get('color') ?? '');
    const [interest, setInterest] = useState(Cookies.get('interest') ?? '');
    const [isHuman, setIsHuman] = useState(Cookies.get('isHuman') === 'true');

    //раньше нужно было, чтобы внутри span номер отображался корректно
    const formatPhoneNumber = (phoneNumber: string | undefined) => {
        if (!phoneNumber) return "";
        const countryCode: string = phoneNumber.slice(0, 1);
        const firstPart: string = phoneNumber.slice(1, 4);
        const secondPart: string = phoneNumber.slice(4, 7);
        const thirdPart: string = phoneNumber.slice(7, 9);
        const fourthPart: string = phoneNumber.slice(9, 12);

        return `+${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
    };

    useEffect(() => {
        Cookies.set('color', color, {expires: 3650});
        Cookies.set('interest', interest, {expires: 3650});
        Cookies.set('isHuman', isHuman.toString(), {expires: 3650});
    }, [user, color, interest, isHuman])

    return (
        <div>
            <p>
                <span>{user && user.username}</span>
            </p>
            <p>
                <span>{user && user.email}</span>
            </p>
            <p>
                <span>{user && user.birthdate.toString()}</span>
            </p>
            <p>
                <span>{user && formatPhoneNumber(user.number)}</span>
            </p>

            <Form>
                <Form.Item label="Любимый цвет">

                    <Input
                        type="text"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        placeholder="Введите ваш любимый цвет"
                    />
                </Form.Item>

                <Form.Item label="Хобби">
                    <Input
                        type="text"
                        value={interest}
                        onChange={e => setInterest(e.target.value)}
                        placeholder="Введите ваше хобби"
                    />
                </Form.Item>

                <Form.Item label="Вы человек?">
                    <Checkbox
                        checked={isHuman}
                        onChange={e => setIsHuman(e.target.checked)}
                    />
                </Form.Item>
            </Form>

        </div>
    );
};

export default UserInfo;