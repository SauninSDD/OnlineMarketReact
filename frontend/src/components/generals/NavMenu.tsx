import React, {useState, useEffect, FC} from 'react';
import {Menu} from 'antd';
import {ShoppingCartOutlined, UserOutlined, InfoCircleOutlined, MenuOutlined} from '@ant-design/icons';
import {Link, Route, Routes} from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import CartPage from '../../pages/CartPage';
import UserPage from '../../pages/UserPage';
import DishesPage from '../../pages/DishesPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import './styles/NavMenu.css';
import RegisterPage from "../../pages/RegisterPage";
import AuthPage from "../../pages/AuthPage";
import {user} from "@/constants/constants";
import ResetPassword from "../AuthPage/ResetPassword";
import ForgotPassword from "../AuthPage/ForgotPassword";

/**
 * Навигационное меню
 * @constructor
 */
const NavigationMenu: FC = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsUserAuthenticated(user != null);
    }, []);


    return (
        <div>
            <div className="navigationMenu">
                <Menu mode="horizontal">
                    <Menu.SubMenu key="restaurant-menu" title="Товары" popupClassName="horizontal-submenu" icon={<MenuOutlined/>}>
                        <Menu.Item key="category:1">
                            <Link to="/" state={{category: '1'}}>Посуда</Link>
                        </Menu.Item>
                        <Menu.Item key="category:2">
                            <Link to="/" state={{category: '2'}}>Текстиль</Link>
                        </Menu.Item>
                        <Menu.Item key="category:3">
                            <Link to="/" state={{anchorId: 'category:3'}}>Мебель</Link>
                        </Menu.Item>
                        <Menu.Item key="category:4">
                            <Link to="/" state={{category: 'category:4'}}>Метлы</Link>
                        </Menu.Item>
                        <Menu.Item key="category:5">
                            <Link to="/" state={{category: 'category:5'}}>Молотки</Link>
                        </Menu.Item>
                        <Menu.Item key="category:6">
                            <Link to="/" state={{category: 'category:6'}}>Шпатели</Link>
                        </Menu.Item>
                        <Menu.Item key="category:7">
                            <Link to="/" state={{category: 'category:7'}}>Черенки</Link>
                        </Menu.Item>
                        <Menu.Item key="category:8">
                            <Link to="/" state={{category: 'category:8'}}>Лопаты</Link>
                        </Menu.Item>
                        <Menu.Item key="category:9">
                            <Link to="/" state={{category: 'category:9'}}>Мать</Link>
                        </Menu.Item>
                        <Menu.Item key="category:10">
                            <Link to="/" state={{category: 'category:10'}}>Граната</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
                        {isUserAuthenticated ? (
                            <Link to="/cart">Корзина</Link>
                        ) : (
                            <Link to="/api/auth/signin">Корзина</Link>
                        )}
                    </Menu.Item>
                    {isUserAuthenticated ? (
                        <Menu.SubMenu key="personal-account" title="Личный кабинет" icon={<UserOutlined/>}>
                            <Menu.Item key="user-profile">
                                <Link to="/user?tab=profile">Профиль</Link>
                            </Menu.Item>
                            <Menu.Item key="delivery">
                                <Link to="/user?tab=delivery">Текущие доставки</Link>
                            </Menu.Item>
                            <Menu.Item key="order">
                                <Link to="/user?tab=order">История заказов</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key="login" icon={<UserOutlined/>}>
                            <Link to="/api/auth/signin">Войти</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="about-company" icon={<InfoCircleOutlined/>}>
                        <Link to="/about">О компании</Link>
                    </Menu.Item>
                </Menu>
            </div>

            <Routes>
                <Route path="/" element={<DishesPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                {isUserAuthenticated ? (
                    <>
                        <Route path="/user" element={<UserPage/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/api/auth/signup" element={<RegisterPage/>}/>
                        <Route path="/api/auth/signin" element={<AuthPage/>}/>
                    </>
                )}
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/forgot" element={<ForgotPassword/>}/>
                <Route path="/reset" element={<ResetPassword/>}/>
            </Routes>
        </div>
    );
};

export default NavigationMenu;
