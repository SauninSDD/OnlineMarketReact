import React, {FC, useState} from "react";
import {Button, Card, Input, Form, message} from "antd";
import {
    CalendarOutlined,
    EditOutlined,
    LogoutOutlined,
    MailOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import AuthService from "../../services/authService";
import {Link} from "react-router-dom";
import authService from "../../services/authService";
import {IUserResponse} from "@/types/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import './styles/UserProfile.css';
import {useTranslation} from "react-i18next";
import UserInfo from "@/components/UserPage/UserInfo";

/**
 * Вкладка профиля пользователя
 * @constructor
 */
const UserProfile: FC = () => {
    const {t} = useTranslation('UserPage');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.auth.user);
    const [form] = Form.useForm<IUserResponse>();


    const handleLogout = () => {
        AuthService.logout();
        message.success(t('logoutSuccess'));
        const reloadTime = 1;
        setTimeout(() => {
            window.location.reload();
        }, reloadTime);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        try {
            console.log("data form", {...form.getFieldsValue()})
            console.log("user", user)
            authService.updateUser({...form.getFieldsValue()}, dispatch)
            setIsEditing(false);
            message.success(t('dataSaved'));
        } catch (error) {
            message.error(t('saveError'));
        }
    };

    return (
        <div className={"userProfile"}>
            <Card hoverable className={"userProfile__card"}>
                <div className="userProfile__content">
                    <div className="userProfile__left">
                        <div className={"userProfile__fields"}>
                            <p>
                                <span className={"infoTitle"}>{t('name')}</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>{t('email')}</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>{t('birthdate')}</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>{t('phoneNumber')}</span>
                            </p>

                        </div>
                    </div>
                    <div className="userProfile__right">
                        {user && isEditing ? (
                            <Form initialValues={user} form={form} className={"userProfile__form-fields"}>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('enterUsername'),
                                        },
                                    ]}
                                >
                                    <Input disabled={true}/>
                                </Form.Item>
                                <Form.Item name="email" rules={[
                                    {
                                        required: true,
                                        message: t('enterEmail'),
                                    },
                                ]}>
                                    <Input prefix={<MailOutlined/>}/>
                                </Form.Item>
                                <Form.Item
                                    name="birthdate"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('enterBirthdate'),
                                        },
                                    ]}
                                >
                                    <Input prefix={<CalendarOutlined/>} disabled={true} type="date"
                                           placeholder={t('birthdate')}/>
                                </Form.Item>
                                <Form.Item
                                    name="number"
                                    validateTrigger={["onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('enterPhoneNumber'),
                                        },
                                    ]}
                                >
                                    <PhoneInput country="ru" onlyCountries={["ru"]} placeholder={t('phoneInputPlaceholder')}/>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" onClick={handleSave}
                                            className={"userProfile__button_save"}
                                    >
                                        <SaveOutlined/>
                                        {t('save')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <UserInfo user={user}/>
                            /*
                            <Form initialValues={user ?? {}}  className={"userProfile__form-fields"}>
                                <Form.Item
                                    name="username"
                                >
                                    <Input readOnly/>
                                </Form.Item>
                                <Form.Item name="email" >
                                    <Input readOnly prefix={<MailOutlined/>}/>
                                </Form.Item>
                                <Form.Item
                                    name="birthdate"
                                >
                                    <Input prefix={<CalendarOutlined/>} readOnly type="date"/>
                                </Form.Item>
                                <Form.Item
                                    name="number"
                                >
                                    <PhoneInput inputProps={{ readOnly: true }} country="ru" onlyCountries={["ru"]} placeholder={t('phoneInputPlaceholder')} />
                                </Form.Item>
                            </Form>*/

                            /*<div>
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
                            </div>*/
                        )}
                    </div>
                </div>
                <Button className={"userProfile__button_editing"} onClick={toggleEditing}>
                    {isEditing ? <span>{t('cancel')}</span> : <EditOutlined/>}
                </Button>
                <Link to="/">
                    <Button
                        icon={<LogoutOutlined style={{fontSize: '30px'}}/>}
                        onClick={handleLogout}
                        className={"userProfile__button_logout"}
                    />
                </Link>
            </Card>
        </div>
    );
};

export {UserProfile};