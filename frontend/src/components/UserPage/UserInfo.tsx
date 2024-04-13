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
    const [theme, setTheme] = useState(Cookies.get('theme') === 'true');
    const [weight, setWeight] = useState(Cookies.get('weight') ?? '');
    const [height, setHeight] = useState(Cookies.get('height') ?? '');
    const [smoke, setSmoke] = useState(Cookies.get('smoke') === 'true');
    const [position, setPosition] = useState(Cookies.get('position') ?? '');
    const [believer, setBeliever] = useState(Cookies.get('believer') === 'true');

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
        Cookies.set('theme', theme.toString(), {expires: 3650});
        Cookies.set('weight', weight, {expires: 3650});
        Cookies.set('height', height, {expires: 3650});
        Cookies.set('smoke', smoke.toString(), {expires: 3650});
        Cookies.set('position', position, {expires: 3650});
        Cookies.set('believer', believer.toString(), {expires: 3650});
    }, [user, color, interest, isHuman, theme, weight, height, smoke, position, believer])

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

                <Form.Item label="Тема">
                    <Checkbox
                        checked={theme}
                        onChange={e => setTheme(e.target.checked)}
                    />
                </Form.Item>

                <Form.Item label="Вес">
                    <Input
                        type="text"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="Введите ваш вес"
                    />
                </Form.Item>

                <Form.Item label="Рост">
                    <Input
                        type="text"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        placeholder="Введите ваш рост"
                    />
                </Form.Item>

                <Form.Item label="Курите?">
                    <Checkbox
                        checked={smoke}
                        onChange={e => setSmoke(e.target.checked)}
                    />
                </Form.Item>

                <Form.Item label="Должность">
                    <Input
                        type="text"
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                        placeholder="Введите вашу должность"
                    />
                </Form.Item>

                <Form.Item label="Верующий?">
                    <Checkbox
                        checked={believer}
                        onChange={e => setBeliever(e.target.checked)}
                    />
                </Form.Item>
            </Form>

        </div>
    );
};

export default UserInfo;