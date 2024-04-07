import React, {FC} from 'react';
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from 'react-router-dom';
import './styles/Footer.css';


/**
 * Компонент-футер
 * @constructor
 */
const Footer: FC = () => {
    const {t} = useTranslation('Footer');

      return (
        <footer className="footer">
            <div className="footer__menu">
                <div className="footer__menu-section">
                    <h3>{t('footer.customers.title')}</h3>
                    <ul>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.how-to-order')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.delivery')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.payment')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.receiving')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.returns')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.customer-support')}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">
                                {t('footer.customers.gift-card')}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3> {t('footer.company.title')} </h3>
                    <ul>
                        <li>
                            <RouterLink to="/about">{t('footer.company.about')}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">{t('footer.company.jobs')}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">{t('footer.company.news')}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">{t('footer.company.privacy-policy')}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/">{t('footer.company.terms-of-service')}</RouterLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3>{t('footer.contacts.title')}</h3>
                    <ul>
                        <li>
                            {t('footer.contacts.phone')}
                        </li>
                        <li>
                            {t('footer.contacts.address.0')}
                        </li>
                        <li>
                            {t('footer.contacts.address.1')}
                        </li>
                        <li>
                            <RouterLink to="/about">{t('footer.contacts.all-contacts')}</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <p>&copy; {t('footer.copyright', {year: new Date().getFullYear()})}</p>
        </footer>
    );
};

export default Footer;
