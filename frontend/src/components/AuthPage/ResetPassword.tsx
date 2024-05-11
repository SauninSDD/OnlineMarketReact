import React, {FC, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import ResetPasswordService from '../../services/resetPasswordService';
import '../../pages/styles/ResetPassword.css';
import {Link} from "react-router-dom";

/**
 * Форма для ввода нового пароля от аккаунта
 * @constructor
 */
const ResetPassword: FC = () => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const token: string | null = params.get("token");

    const [success, setSuccess] = useState<boolean>(false);

    const handleFormSubmit = async (values: { password: string, confirmPassword: string }) => {
        if (!token) {
            message.error('Токен отсутствует. Невозможно выполнить сброс пароля');
            return;
        }

        if (values.password !== values.confirmPassword) {
            message.error('Введенные пароли не совпадают');
            return;
        }

        try {
            await ResetPasswordService.resetPassword(token, values.password, values.confirmPassword);
            setSuccess(true);
        } catch (error) {
            message.error('Ошибка при сбросе пароля');
        }
    };

    return (
        <div className="resetPassword">
            {success ? (
                <div>
                    <h1 className="resetPassword-h1">
                        Отлично!
                    </h1>
                    <div className="resetPassword__success-message">
                        Пароль успешно обновлен
                    </div>
                    <Link to="/signin">
                        <Button type="primary" className="resetPassword__button">
                            Войти в аккаунт
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <h1 className="resetPassword-h1">Установка нового пароля</h1>
                    <Form className="resetPassword__form-content" onFinish={handleFormSubmit}>
                        <Form.Item
                            name="password"
                            label="Новый пароль"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите новый пароль!',
                                },
                            ]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Подтвердите пароль"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, подтвердите пароль!',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Введенные пароли не совпадают!'));
                                    },
                                }),
                            ]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="resetPassword__button">
                                Установить новый пароль
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
