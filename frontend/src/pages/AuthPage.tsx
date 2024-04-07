import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, message} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import authService from "../services/authService";
import {useDispatch} from "react-redux";
import {ILogin} from "@/types/types";
import './styles/AuthPage.css';
import {useTranslation} from "react-i18next";

/**
 * Страница аутентификации пользователя
 * @constructor
 */
const AuthPage: FC = () => {
    const {t} = useTranslation('AuthPage');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values: ILogin) => {
        authService.loginUser(values, dispatch).then((user) => {
            console.log(user)
            //dispatch(login(user))
            message.success(t('success'))
             navigate("/")
            const reloadTime = 1;
            setTimeout(() => {
                 window.location.reload();
             }, reloadTime);

        }, (error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();
            console.log(_content);
            message.error(t('incorrect'))
        });
    };

    return (
        <Row className={"authPage"}>
            <Card className={"authPage__card"}>
                <div style={{display: 'flex'}}>
                    <div className={"authPage__card-content"}>
                        <h1 className={"authPage__card-h1"}>
                            {t('welcome')}
                        </h1>
                        <p className={"authPage__card-p"}>
                            {t('firstTimeGuests')}
                        </p>
                        <Link to="/api/auth/signup" style={{marginTop: '20px'}}>
                            <Button
                                type="primary"
                                shape="round" size="large"
                                className={"authPage__button"}>
                                {t('register')}
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 className={"authPage__card-h2"}>
                            {t('authentication')}
                        </h2>
                        <Form
                            name="normal_login"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message:t('pleaseEnterUsername')}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message:t('pleaseEnterPassword')}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder={t('password')}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    {t('loginButton')}
                                </Button>
                            </Form.Item>
                        </Form>
                        <p style={{fontSize: '18px', textAlign: 'center'}}> {t('forgotPassword')} <Link
                            to="/forgot"> {t('restore')} </Link></p>
                    </div>
                </div>
            </Card>
        </Row>
    );
};

export default AuthPage;
