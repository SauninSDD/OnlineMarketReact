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
import {useTranslation} from "react-i18next";
import {ILanguagesModel} from "@/components/generals/models/NavMenuModel";
import {Container, StyledButton} from "@/components/generals/styles/SwitcherLanguages";

/**
 * Навигационное меню
 * @constructor
 */
const NavigationMenu: FC = () => {
    const {t, i18n} = useTranslation('NavigationMenu');
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsUserAuthenticated(user != null);
    }, []);

    const languages: ILanguagesModel = {
        ru: {nativeName: 'Русский'},
        en: {nativeName: 'English'}
    };

    return (
        <div>
            <div className="navigationMenu">
                <Menu mode="horizontal">
                    <Menu.SubMenu key="restaurant-menu" title={t('navMenuItems.products')} popupClassName="horizontal-submenu"
                                  icon={<MenuOutlined/>}>
                        <Menu.Item key="category:1">
                            <Link to="/" state={{category: '1'}}>{t('navMenuItems.category.category1')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:2">
                            <Link to="/" state={{category: '2'}}>{t('navMenuItems.category.category2')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:3">
                            <Link to="/" state={{anchorId: 'category:3'}}>{t('navMenuItems.category.category3')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:4">
                            <Link to="/" state={{category: 'category:4'}}>{t('navMenuItems.category.category4')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:5">
                            <Link to="/" state={{category: 'category:5'}}>{t('navMenuItems.category.category5')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:6">
                            <Link to="/" state={{category: 'category:6'}}>{t('navMenuItems.category.category6')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:7">
                            <Link to="/" state={{category: 'category:7'}}>{t('navMenuItems.category.category7')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:8">
                            <Link to="/" state={{category: 'category:8'}}>{t('navMenuItems.category.category8')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:9">
                            <Link to="/" state={{category: 'category:9'}}>{t('navMenuItems.category.category9')}</Link>
                        </Menu.Item>
                        <Menu.Item key="category:10">
                            <Link to="/" state={{category: 'category:10'}}>{t('navMenuItems.category.category10')}</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
                        {isUserAuthenticated ? (
                            <Link to="/cart">{t('navMenuItems.cart')}</Link>
                        ) : (
                            <Link to="/api/auth/signin">{t('navMenuItems.cart')}</Link>
                        )}
                    </Menu.Item>
                    {isUserAuthenticated ? (
                        <Menu.SubMenu key="personal-account" title={t('navMenuItems.privateOffice')} icon={<UserOutlined/>}>
                            <Menu.Item key="user-profile">
                                <Link to="/user?tab=profile">{t('navMenuItems.user.profile')}</Link>
                            </Menu.Item>
                            <Menu.Item key="delivery">
                                <Link to="/user?tab=delivery">{t('navMenuItems.user.delivery')}</Link>
                            </Menu.Item>
                            <Menu.Item key="order">
                                <Link to="/user?tab=order">{t('navMenuItems.user.order')}</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key="login" icon={<UserOutlined/>}>
                            <Link to="/api/auth/signin">{t('navMenuItems.sign-in')}</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="about-company" icon={<InfoCircleOutlined/>}>
                        <Link to="/about">{t('navMenuItems.about')}</Link>
                    </Menu.Item>
                </Menu>
                <Container>
                    {Object.keys(languages).map((language) => (
                        <StyledButton
                            type="primary"
                            key={language}
                            onClick={() => i18n.changeLanguage(language)}
                            disabled={i18n.resolvedLanguage === language}
                        >
                            {languages[language].nativeName}
                        </StyledButton>))}
                </Container>
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
