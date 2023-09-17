import { Space, Spin } from 'antd';
const Preloader = () => (
    <Space size="middle" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Spin size="large" />
        <Spin />
        <Spin size="large" />
    </Space>
);
export default Preloader;