import React, {FC, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './styles/Footer.css';
import {user} from "../../constants/constants";

/**
 * Компонент-футер
 * @constructor
 */
const Footer: FC = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsUserAuthenticated(user != null);
    }, []);

    return (
        <footer className="footer">
            <div className="footer__menu">
                <div className="footer__menu-section">
                    <h3>Меню</h3>
                    <ul>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:1'}}>
                                Салаты
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:2'}}>
                                Роллы
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:3'}}>
                                Вторые блюда
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:4'}}>
                                Пицца
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:5'}}>
                                Напитки
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3>Клиент</h3>
                    <ul>
                        <li>
                            {isUserAuthenticated ? (
                                <RouterLink to="/cart">Корзина</RouterLink>
                            ) : (
                                <RouterLink to="/api/auth/signin">Корзина</RouterLink>
                            )}
                        </li>
                        <li>
                            {isUserAuthenticated ? (
                                <RouterLink to="/user?tab=profile">Профиль</RouterLink>
                            ) : (
                                <RouterLink to="/api/auth/signin">Профиль</RouterLink>
                            )}
                        </li>
                        <li>
                            {isUserAuthenticated ? (
                                <RouterLink to="/user?tab=delivery">Текущие доставки</RouterLink>
                            ) : (
                                <RouterLink to="/api/auth/signin">Текущие доставки</RouterLink>
                            )}
                        </li>
                        <li>
                            {isUserAuthenticated ? (
                                <RouterLink to="/user?tab=order">История заказов</RouterLink>
                            ) : (
                                <RouterLink to="/api/auth/signin">История заказов</RouterLink>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3>Другое</h3>
                    <ul>
                        <li>
                            <RouterLink to="/about">О компании</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <p>&copy; {new Date().getFullYear()} Грузинский ресторан</p>
        </footer>
    );
};

export default Footer;
