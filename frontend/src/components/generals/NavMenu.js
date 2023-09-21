import React from 'react';
import { Menu } from 'antd';
import { AppstoreAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, Route, Routes } from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import CartPage from '../../pages/CartPage';
import ClientPage from '../../pages/ClientPage';
import DishesPage from '../../pages/DishesPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

const NavigationMenu = () => {


    return (
        <div>
            <div style={{position: "sticky", top: "0", zIndex: "666"}}>
                <Menu mode="horizontal">
                <Menu.SubMenu key="restaurant-menu" title="Меню" icon={<SettingOutlined/>}>
                    <Menu.Item key="category:1">
                        <Link to="/" state={{ anchorId: 'category:1' }}>Категория 1</Link>
                    </Menu.Item>
                    <Menu.Item key="category:2">
                        <Link to="/" state={{ anchorId: 'category:2' }}>Категория 2</Link>
                    </Menu.Item>
                    <Menu.Item key="category:3">
                        <Link to="/" state={{ anchorId: 'category:3' }}>Категория 3</Link>
                    </Menu.Item>
                    <Menu.Item key="category:4">
                        <Link to="/" state={{ anchorId: 'category:4' }}>Категория 4</Link>
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
