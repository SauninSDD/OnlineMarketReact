import React, {FC, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import ResetPasswordService from '../../services/resetPasswordService';
import '../../pages/styles/ForgotPassword.css';

/**
 * Форма для отправки на почту ссылки для сброса пароля от аккаунта
 * @constructor
 */
const ForgotPassword: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleFormSubmit = async (values: { email: string }) => {
        setLoading(true);

        try {
            await ResetPasswordService.forgotPassword(values.email);
            setSuccess(true);
        } catch (err) {
            message.error("Пользователя с такой почтой не существует");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgotPassword">
            {success ? (
                <h1 className="forgotPassword-h1">
                    Успех!
                </h1>
            ) : (
                <h1 className="forgotPassword-h1">
                    Забыли пароль?
                </h1>
            )}
            {success ? (
                <div>
                    Сообщение с ссылкой для сброса пароля отправлена на вашу почту!
                </div>
            ) : (
                <>
                    <Form
                        className="forgotPassword__form-content"
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите ваш Email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Введите корректный Email!',
                                },
                            ]}
                        >
                            <Input type="email" name="email"/>
                        </Form.Item>
                        <div className="forgotPassword__button-container">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="forgotPassword__button"
                                    loading={loading}
                                >
                                    Отправить новый пароль на почту
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
