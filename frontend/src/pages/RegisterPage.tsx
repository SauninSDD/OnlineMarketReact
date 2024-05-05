import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, message} from 'antd';
import {UserOutlined, MailOutlined, CalendarOutlined, LockOutlined} from '@ant-design/icons';
import authService from '../services/authService';
import {IRegistration} from "@/types/types";
import './styles/RegisterPage.css';
import {useTranslation} from "react-i18next";

/**
 * Страница регистрации пользователя
 * @constructor
 */
const RegisterPage: FC = () => {
    const {t} = useTranslation('RegisterPage');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const currentDate = new Date();
    const onFinish = (values: IRegistration) => {
        if (values.number.startsWith('+')) {
            values.number = values.number.substring(1);
        }
        authService
            .register(values)
            .then(() => {
                message.success(t('registerSuccess'));
                navigate('/signin');
            })
            .catch((error) => {
                message.error(t('registerError'));
                console.error(error);
            });
    };

    return (
        <Row className={"registerPage"}>
            <Card className={"registerPage__card"}>
                <div style={{display: 'flex'}}>
                    <div className={"registerPage__card-content"}>
                        <h1 className={"registerPage__card-h1"}>
                            {t('welcome')}
                        </h1>
                        <p className={"registerPage__card-p"}>
                            {t('alreadyRegistered')}
                        </p>
                        <Link to="/signin" style={{marginTop: '20px'}}>
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                className={"registerPage__button"}>
                                {t('authButton')}
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>

                        <h2 className={"registerPage__card-h2"}>
                            {t('register')}
                        </h2>

                        <Form form={form} layout="vertical" name="register" onFinish={onFinish}>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: t('pleaseEnterUsername')}]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder={t('nameUserPlaceholder')}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{required: true, message: t('pleaseEnterEmail')}]}
                            >
                                <Input prefix={<MailOutlined/>} type="email" placeholder={t('email')}/>
                            </Form.Item>

                            <Form.Item
                                name="number"
                                validateTrigger={["onBlur"]}
                                rules={[
                                    { required: true, message: t('pleaseEnterPhoneNumber') },
                                    { pattern: /^(\+7|8)\d{10}$/, message: t('invalidPhoneNumber') }
                                ]}
                            >
                                <Input type="tel" placeholder={t('phoneNumber')} maxLength={12} />
                            </Form.Item>


                            <Form.Item
                                name="birthdate"
                                rules={[
                                    {required: true, message: t('pleaseEnterBirthdate')},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            const selectedDate = new Date(value);

                                            if (selectedDate.getFullYear() >= 1901 && selectedDate <= currentDate) {
                                                return Promise.resolve();
                                            }

                                            if (selectedDate.getFullYear() < 1901) {
                                                return Promise.reject(t('yearOfBirthCannotBeBefore'));
                                            }

                                            if (selectedDate > currentDate) {
                                                return Promise.reject(t('yearOfBirthCannotExceedCurrentDate'));
                                            }
                                        },
                                    }),
                                ]}
                            >
                                <Input prefix={<CalendarOutlined/>} type="date" placeholder={t('birthdate')}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: t('pleaseEnterPassword')}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder={t('password')}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    {t('registerButton')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
        </Row>
    );
};

export default RegisterPage;
