import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";

/**
 * Страница неправильного пути
 * @constructor
 */
export const NotFoundPage = () => {
    const {t} = useTranslation('Staff');

    return (
        <Result
            status="404"
            title="404"
            subTitle={t('notFound')}
            extra={<Button type="primary"><Link to="/">{t('home')}</Link></Button>}
        />
    )
}