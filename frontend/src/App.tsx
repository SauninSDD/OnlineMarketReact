import React, {useEffect} from "react";
import Preloader from "./components/generals/Preloader"
import './App.css';
import './i18n';
import NavigationMenu from "./components/generals/NavMenu";
import {FloatButton} from "antd";
import Header from "./components/generals/Header";
import authService from "./services/authService";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Suspense} from 'react';


const App = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const refreshToken = () => {
        console.log("Check for refresh");
        const userStr = sessionStorage.getItem("user");

        let userS = null;
        if (userStr) {
            userS = JSON.parse(userStr);
        } else if (localStorage.getItem("user")) {
            authService.logout();
        }
        console.log(userStr);
        if (userS) {
            const refresh_token = userS.refresh_token;
            authService.refresh(refresh_token, dispatch)
                .then((userData) => {
                    console.log("Refresh successful", userData);
                })
                .catch((error) => {
                    authService.logout();
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
                    <NavigationMenu/>
                    <FloatButton.BackTop style={{width: "2.5%", height: "5%"}} visibilityHeight={100}/>
                </div>
            </div>
        </Suspense>
    );
}

export default App;
