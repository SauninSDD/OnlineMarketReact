import {Space, Spin} from 'antd';
import React, {FC} from "react";
import './styles/Preloader.css';

interface PreloaderProps {
    className?: string;
}

/**
 * Спиннер
 * @constructor
 */
const Preloader: FC<PreloaderProps> = ({ className }) => (
    <Space size="middle" className={className}>
        <Spin size="large"/>
        <Spin/>
        <Spin size="large"/>
    </Space>
);
export default Preloader;