import React, {FC, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ListDishes from '../components/DishesPage/ListDishes';
import DishService from "../services/dishService";
import Footer from "../components/generals/Footer";
import "./styles/DishesPage.css";
import Slider from "../components/DishesPage/Carousel";
import {IProduct} from "@/types/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import SearchDishes from "../components/DishesPage/SearchDishes";
import {
    setCategory,
    setCurrentPage,
    setFetching,
    setTotalPage
} from "@/slices/dishesSlice";
import {useTranslation} from "react-i18next";

/**
 * Страница товаров ресторана
 * @constructor
 */
const DishesPage: FC = () => {
    const {t} = useTranslation();
    const [size] = useState<number>(10)
    const currentCategory = useAppSelector((state) => state.dishes.category);
    const [scrollValueInPercent] = useState<number>(50)
    const dispatch = useAppDispatch()
    const location = useLocation();
    const category: string = location.state ? location.state.category : '';
    const fetching = useAppSelector((state) => state.dishes.fetching[category]) ?? true;
    const totalPage = useAppSelector((state) => state.dishes.totalPage[category]) ?? 1;
    const currentPage = useAppSelector((state) => state.dishes.currentPage[category]) ?? 0;
    const listDishes: IProduct[] = useAppSelector((state) => state.dishes.dishes[category]) ?? [];
    const [searchText, setSearchText] = useState('');

    const scrollHandler = () => {
        if ((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight))
            * 100 > scrollValueInPercent && currentPage < totalPage) {
            dispatch(setFetching(true))
        }
    }

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

     useEffect(() => {
         if (currentCategory !== category && currentCategory !== null) {
             dispatch((setCategory(category)))
         }
     }, [category]);

    useEffect(() => {
        if (fetching && currentPage < totalPage) {
            DishService.getDishes(category, size, currentPage, dispatch)
                .then((response) => {
                    dispatch(setCurrentPage(currentPage + 1))
                    dispatch(setTotalPage(parseInt(response?.headers['x-total-pages'] ?? '0')))
                })
                .finally(() => dispatch(setFetching(false)))
        }
    }, [category, fetching, listDishes]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [])

    return (
        <div className="dishPage">
            <div className="dishPage__content">
                <Slider/>
                <SearchDishes onSearch={handleSearch}/>
                <div className="category-section">
                    {listDishes?.length === 0 && <p className="dishPage__content_p">
                        {t('dishNotFound')}
                    </p>}
                    <div>
                        <h2 id="category:1">{category}</h2>
                        <ListDishes dishes={listDishes}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DishesPage;
