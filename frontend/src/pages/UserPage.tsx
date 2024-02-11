import React, {FC, useEffect} from 'react';
import {UserProfile} from '../components/UserPage/UserProfile';
import OrderHistory from '../components/UserPage/OrderHistory';
import {useLocation, useNavigate} from 'react-router-dom';
import CurrentOrders from '../components/UserPage/CurrentOrders';
import {Tabs} from 'antd';
import {IOrderFromHistory} from "../types/types";
import {useAppSelector} from "../hooks";
import './styles/UserPage.css'
const {TabPane} = Tabs;

/**
 * Страница пользователя
 * @constructor
 */
const UserPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const anchorId = location.state ? location.state.anchorId : null;
    const listOrders: IOrderFromHistory[] = useAppSelector((state) => state.orders.orders);
    const searchParams = new URLSearchParams(location.search);
    const activeTabParam = searchParams.get('tab') || 'profile';

    useEffect(() => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, [anchorId]);

    const handleTabChange = (activeKey: string) => {
        navigate(`/user?tab=${activeKey}`);
    };

    return (
        <div>
            <Tabs  className="userProfile__tabs" tabPosition="left" activeKey={activeTabParam} onChange={handleTabChange}>
                <TabPane tab="Профиль" key="profile">
                    <h3>Профиль</h3>
                    <UserProfile/>
                </TabPane>
                <TabPane tab="Текущие доставки" key="delivery">
                    <h3>Текущие доставки</h3>
                    <CurrentOrders listOfCurrentOrders={listOrders.filter(order => order.status !== "COMPLETED" && order.status !== "CANCELLED")} />
                </TabPane>
                <TabPane tab="История заказов" key="order">
                    <h3>История заказов</h3>
                    <OrderHistory listOrdersFromHistory={listOrders.filter(order => order.status === "COMPLETED" || order.status === "CANCELLED")} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserPage;
