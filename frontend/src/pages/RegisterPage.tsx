import React, {FC} from 'react';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {Row, Card, Form, Input, Button, message} from 'antd';
import {UserOutlined, MailOutlined, CalendarOutlined, LockOutlined} from '@ant-design/icons';
import authService from '../services/authService';
import {IRegistration} from "@/types/types";
import './styles/RegisterPage.css';
import PhoneInput from "react-phone-input-2";
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
    const searchParams = new URLSearchParams(location.search);
    const context = searchParams.get('target') || '';
    const onFinish = (values: IRegistration) => {
        authService
            .register(values)
            .then(() => {
                message.success(t('registerSuccess', { context }));
                navigate('/api/auth/signin');
            })
            .catch((error) => {
                message.error(t('registerError', { context }));
                console.error(error);
            });
    };

    return (
        <Row className={"registerPage"}>
            <Card className={"registerPage__card"}>
                <div style={{display: 'flex'}}>
                    <div className={"registerPage__card-content"}>
                        <h1 className={"registerPage__card-h1"}>
                            {t('welcome', { context })}
                        </h1>
                        <p className={"registerPage__card-p"}>
                            {t('alreadyRegistered', { context })}
                        </p>
                        <Link to="/api/auth/signin" style={{marginTop: '20px'}}>
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                className={"registerPage__button"}>
                                {t('authButton', { context })}
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 className={"registerPage__card-h2"}>
                            {t('register', { context })}
                        </h2>
                        <Form form={form} layout="vertical" name="register" onFinish={onFinish}>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: t('pleaseEnterUsername', { context })}]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder={t('nameUserPlaceholder', { context })}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{required: true, message: t('pleaseEnterEmail', { context })}]}
                            >
                                <Input prefix={<MailOutlined/>} type="email" placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="number"
                                validateTrigger={["onBlur"]}
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseEnterPhoneNumber', { context }),
                                    },
                                ]}
                            >
                                <PhoneInput
                                    country="ru"
                                    onlyCountries={["ru"]}
                                    placeholder={t('phoneInputPlaceholder', { context })}
                                />
                            </Form.Item>
                            <Form.Item
                                name="birthdate"
                                rules={[
                                    {required: true, message: t('pleaseEnterBirthdate', { context })},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            const selectedDate = new Date(value);

                                            if (selectedDate.getFullYear() >= 1901 && selectedDate <= currentDate) {
                                                return Promise.resolve();
                                            }

                                            if (selectedDate.getFullYear() < 1901) {
                                                return Promise.reject(t('yearOfBirthCannotBeBefore', { context }));
                                            }

                                            if (selectedDate > currentDate) {
                                                return Promise.reject(t('yearOfBirthCannotExceedCurrentDate', { context }));
                                            }
                                        },
                                    }),
                                ]}
                            >
                                <Input prefix={<CalendarOutlined/>} type="date" placeholder={t('birthdate', { context })}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: t('pleaseEnterPassword', { context })}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder={t('password', { context })}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    {t('registerButton', { context })}
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
