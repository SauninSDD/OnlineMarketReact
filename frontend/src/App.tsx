import React, {useEffect} from "react";
import Preloader from "./components/generals/Preloader"
import './App.css';
import './i18n';
import NavMenu from "./components/generals/NavMenu";
import {FloatButton} from "antd";
import Header from "./components/generals/Header";
import AuthService from "./services/authService";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Suspense} from 'react';


const App = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const refreshToken = () => {
        console.log("Check for refresh");
        const userStr = localStorage.getItem("user");

        let userS = null;
        if (userStr) {
            userS = JSON.parse(userStr);
        }

        console.log(userStr);
        if (userS) {
            const refresh_token = userS.refresh_token;
            AuthService.refresh(refresh_token, dispatch)
                .then((userData) => {
                    console.log("Refresh successful", userData);
                })
                .catch((error) => {
                    AuthService.logout();
                    console.error("Error during refresh", error);
                });
        }
    };

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            refreshToken();
        }, 4 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [user]);

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <Suspense fallback={<Preloader className="preloader"/>}>
            <div className="App">
                <div>
                    <Header/>
                    <NavMenu/>
                    <FloatButton.BackTop style={{width: "2.5%", height: "5%"}} visibilityHeight={100}/>
                </div>
            </div>
        </Suspense>
    );
}

export default App;
