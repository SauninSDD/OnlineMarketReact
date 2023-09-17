import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { AppstoreAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import CartPage from '../../pages/CartPage';
import ClientPage from '../../pages/ClientPage';
import DishesPage from '../../pages/DishesPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

const NavigationMenu = () => {
    const navigate = useNavigate();

    const scrollToElement = (anchorId) => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMenuItemClick = (to, anchorId) => {
        navigate(to, {state: {anchorId: anchorId}}); // Затем выполняем переход на указанный маршрут
        scrollToElement(anchorId); // Сначала прокручиваем к элементу
    };

    useEffect(() => {
        // Выполните скролл после монтирования компонента в DOM

    }, []); // Пустой массив зависимостей означает, что useEffect будет выполняться только после монтирования

    return (
        <div>
            <div style={{position: "sticky", top: "0"}}>
                <Menu mode="horizontal">
                <Menu.SubMenu key="restaurant-menu" title="Меню" icon={<SettingOutlined/>}>
                    <Menu.Item key="category:1">
                        <Link to="/">Категория 1</Link>
                    </Menu.Item>
                    <Menu.Item key="category:2">
                        <a onClick={() => handleMenuItemClick('/', 'category:2')}>Категория 2</a>
                    </Menu.Item>
                    <Menu.Item key="category:3">
                        <a onClick={() => handleMenuItemClick('/', 'category:3')}>Категория 3</a>
                    </Menu.Item>
                    <Menu.Item key="category:4">
                        <a onClick={() => handleMenuItemClick('/', 'category:4')}>Категория 4</a>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="cart" icon={<AppstoreAddOutlined/>}>
                    <Link to="/cart">Корзина</Link>
                </Menu.Item>
                <Menu.SubMenu key="personal-account" title="Личный кабинет" icon={<SettingOutlined/>}>
                    <Menu.Item key="client-profile">
                        <Link to="/client">Профиль</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/client">Доставка</Link>
                    </Menu.Item>
                    <Menu.Item key="order">
                        <Link to="/client">Заказы</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="about-company" icon={<AppstoreAddOutlined/>}>
                    <Link to="/about">О компании</Link>
                </Menu.Item>
            </Menu></div>

            <Routes>
                <Route path="/"  element={<DishesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/client" element={<ClientPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default NavigationMenu;
