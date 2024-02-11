import {Space, Spin} from 'antd';
import React, {FC} from "react";
import './styles/Preloader.css';

/**
 * Спиннер во время загрузки приложения
 * @constructor
 */
const Preloader: FC = () => (
    <Space size="middle" className={"preloader"}>
        <Spin size="large"/>
        <Spin/>
        <Spin size="large"/>
    </Space>
);
export default Preloader;