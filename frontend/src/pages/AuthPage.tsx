import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, message} from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {login} from "../slices/authSlice";
import authService from "../services/authService";
import {useDispatch} from "react-redux";
import {ILogin} from "../types/types";
import './styles/AuthPage.css';

/**
 * Страница аутентификации пользователя
 * @constructor
 */
const AuthPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values: ILogin) => {
        authService.loginUser(values, dispatch).then((user) => {
            console.log(user)
            //dispatch(login(user))
            message.success("Вы успешно вошли в систему! Здравствуйте!")
             navigate("/")
            const reloadTime = 1;
            setTimeout(() => {
                 window.location.reload();
             }, reloadTime);

        }, (error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();
            console.log(_content);
            message.error("Неверно указан логин или пароль!")
        });
    };

    return (
        <Row className={"authPage"}>
            <Card className={"authPage__card"}>
                <div style={{display: 'flex'}}>
                    <div className={"authPage__card-content"}>
                        <h1 className={"authPage__card-h1"}>
                            Здравствуйте!
                        </h1>
                        <p className={"authPage__card-p"}>
                            Если вы впервые у нас в гостях, и у вас нет аккаунта, то вы можете зарегистрироваться на
                            нашем сайте.
                        </p>
                        <Link to="/api/auth/signup" style={{marginTop: '20px'}}>
                            <Button
                                type="primary"
                                shape="round" size="large"
                                className={"authPage__button"}>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 className={"authPage__card-h2"}>
                            Авторизация
                        </h2>
                        <Form
                            name="normal_login"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Пожалуйста, введите username!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    Войти
                                </Button>
                            </Form.Item>
                        </Form>
                        <p style={{fontSize: '18px', textAlign: 'center'}}>Забыли пароль? <Link
                            to="/forgot">Восстановите</Link></p>
                    </div>
                </div>
            </Card>
        </Row>
    );
};

export default AuthPage;
