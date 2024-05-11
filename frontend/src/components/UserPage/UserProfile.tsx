import React, {FC, useEffect, useState} from "react";
import {Button, Card, Input, Form, message} from "antd";
import {
    CalendarOutlined,
    EditOutlined,
    LogoutOutlined,
    MailOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import {Link} from "react-router-dom";
import AuthService from "../../services/authService";
import {IUser} from "@/types/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import './styles/UserProfile.css';
import {useTranslation} from "react-i18next";
import UserInfo from "@/components/UserPage/UserInfo";
import {logout} from "@/slices/authSlice";

/**
 * Вкладка профиля пользователя
 * @constructor
 */
const UserProfile: FC = () => {
    const {t} = useTranslation('UserPage');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.auth.user);
    const [form] = Form.useForm<IUser>();

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout())
        message.success(t('logoutSuccess'));
    };

    const handleSave = () => {
        try {
            console.log("data form", {...form.getFieldsValue()})
            console.log("user", user)
            AuthService.updateUser({...form.getFieldsValue()}, dispatch)
            setIsEditing(false)
            message.success(t('dataSaved'))
        } catch (error) {
            message.error(t('saveError'));
        }
    };

    useEffect(() => {
    }, [isEditing])

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
                                //TODO надо будет поправить логику добавления номера
                                <Form.Item
                                    name="number"
                                    validateTrigger={["onBlur"]}
                                    rules={[
                                        {required: true, message: t('enterPhoneNumber')},
                                        {pattern: /^(\+7|8)\d{10}$/, message: t('invalidPhoneNumber')}
                                    ]}
                                >
                                    <Input type="tel" placeholder={t('phoneNumber')} maxLength={12}/>
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
                        )}
                    </div>
                </div>
                <Button className={"userProfile__button_editing"} onClick={() => setIsEditing(!isEditing)}>
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