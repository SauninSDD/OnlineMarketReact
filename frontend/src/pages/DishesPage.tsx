import React, {FC, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ListDishes from '../components/DishesPage/ListDishes';
import DishService from "../services/dishService";
import Footer from "../components/generals/Footer";
import "./styles/DishesPage.css";
import Slider from "../components/DishesPage/Carousel";
import {IProductCategory} from "@/types/types";
import {useAppDispatch, useAppSelector} from "@/hooks";
import SearchDishes from "../components/DishesPage/SearchDishes";
import {
    setCategory,
    setCurrentPage,
    setFetching,
    setTotalPage
} from "@/slices/dishesSlice";
import {useTranslation} from "react-i18next";
import Preloader from "@/components/generals/Preloader";

/**
 * Страница товаров ресторана
 * @constructor
 */
const DishesPage: FC = () => {
    const {t} = useTranslation('DishesPage');
    const [size] = useState<number>(15)
    const currentCategory = useAppSelector((state) => state.dishes.category);
    const [scrollValueInPercent] = useState<number>(50)
    const dispatch = useAppDispatch()
    const location = useLocation();
    const category: IProductCategory = location.state?.category ?? {id: -1, category: ''};
    const fetching = useAppSelector((state) => state.dishes.fetching[category.id]) ?? true;
    const totalPage = useAppSelector((state) => state.dishes.totalPage[category.id]) ?? 1;
    const currentPage = useAppSelector((state) => state.dishes.currentPage[category.id]) ?? 0;
    const listDishes = useAppSelector((state) => state.dishes.dishes[category.id]) ?? [];
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
        if (currentCategory !== category.id && currentCategory !== null) {
            dispatch((setCategory(category.id)))
        }
    }, [category]);

    useEffect(() => {
        if (fetching && currentPage < totalPage) {
            //Если категории нет в location, то откинуть значение id которого не существует для получения всех продуктов
            DishService.getDishes(category.id, size, currentPage, dispatch)
                .then((response) => {
                    dispatch(setCurrentPage(currentPage + 1))
                    dispatch(setTotalPage(parseInt(response?.headers['x-total-pages'] ?? '0')))
                })
                .finally(() => dispatch(setFetching(false)))
        } else {
            dispatch(setFetching(false))
        }
    }, [category.id, fetching, currentPage]);

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
                    <div>
                        <h2 id="category:1">{category.categoryName ? category.categoryName : t('allProductsTitle')}</h2>
                        <ListDishes dishes={listDishes}/>
                        {listDishes?.length === 0 && !fetching && <p className="dishPage__content_p">
                            {t('dishNotFound')}
                        </p>}
                        {currentPage < totalPage ?
                            <Preloader className={"dishPreloader"}/>
                            : null
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DishesPage;
