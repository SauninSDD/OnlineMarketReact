import React, {FC, lazy, useEffect} from 'react';
import {Menu} from 'antd';
import {ShoppingCartOutlined, UserOutlined, InfoCircleOutlined, MenuOutlined} from '@ant-design/icons';
import {Link, Route, Routes} from 'react-router-dom';
import CartPage from '../../pages/CartPage';
import DishesPage from '../../pages/DishesPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import './styles/NavMenu.css';
import ResetPassword from "../AuthPage/ResetPassword";
import ForgotPassword from "../AuthPage/ForgotPassword";
import {useTranslation} from "react-i18next";
import {Container, StyledButton} from "@/components/generals/styles/SwitcherLanguages";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {clearState} from "@/slices/dishesSlice";
import CategoryService from "@/services/categoryService";

const AboutPage = lazy(() => import('../../pages/AboutPage'));
const UserPage = lazy(() => import('../../pages/UserPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const AuthPage = lazy(() => import('../../pages/AuthPage'));

/**
 * Навигационное меню
 * @constructor
 */
const NavMenu: FC = () => {
    const {t, i18n} = useTranslation('NavMenu');
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const languages = useAppSelector((state) => state.auth.languages);
    const categories = useAppSelector((state) => state.categories.categories);
    const dispatch = useAppDispatch()

    useEffect(() => {
        CategoryService.getCategories(i18n.resolvedLanguage ?? 'ru', dispatch)
    }, [i18n.language])

    return (
        <div>
            <div className="navigationMenu">
                <Menu mode="horizontal">
                    <Menu.SubMenu key="categories" title={t('navMenuItems.products')}
                                  popupClassName="horizontal-submenu"
                                  icon={<MenuOutlined/>}>

                        {categories.map((category) => <Menu.Item key={category.id}>
                                <Link to="/" state={{category: category}}>
                                    {category.categoryName}
                                </Link>

                            </Menu.Item>
                        )}

                    </Menu.SubMenu>
                    <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
                        {isLoggedIn ? (
                            <Link to="/cart">{t('navMenuItems.cart')}</Link>
                        ) : (
                            <Link to="/signin">{t('navMenuItems.cart')}</Link>
                        )}
                    </Menu.Item>
                    {isLoggedIn ? (
                        <Menu.SubMenu key="personal-account" title={t('navMenuItems.privateOffice')}
                                      icon={<UserOutlined/>}>
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
                            <Link to="/signin">{t('navMenuItems.sign-in')}</Link>
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
                            onClick={() => {
                                i18n.changeLanguage(language).then(() => dispatch(clearState()))
                            }}
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
                {isLoggedIn ? (
                    <>
                        <Route path="/user" element={<UserPage/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/signup" element={<RegisterPage/>}/>
                        <Route path="/signin" element={<AuthPage/>}/>
                    </>
                )}
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/forgot" element={<ForgotPassword/>}/>
                <Route path="/reset" element={<ResetPassword/>}/>
            </Routes>
        </div>
    );
};

export default NavMenu;
