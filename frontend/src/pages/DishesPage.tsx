import React, {FC, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ListDishes from '../components/DishesPage/ListDishes';
import {scroller} from 'react-scroll';
import DishService from "../services/dishService";
import Footer from "../components/generals/Footer";
import "./styles/DishesPage.css";
import Slider from "../components/DishesPage/Carousel";
import {IDish} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks";
import SearchDishes from "../components/DishesPage/SearchDishes";
import {setCurrentPage, setFetching, setTotalPage} from "../slices/dishesSlice";

/**
 * Страница меню ресторана
 * @constructor
 */
const DishesPage: FC = () => {
    const listDishes: IDish[] = useAppSelector((state) => state.dishes.dishes);
    const [size] = useState<number>(10)
    const currentPage = useAppSelector((state) => state.dishes.currentPage);
    const totalPage = useAppSelector((state) => state.dishes.totalPage);
    const fetching = useAppSelector((state) => state.dishes.fetching);
    const [scrollValueInPercent] = useState<number>(50)
    const dispatch = useAppDispatch()
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        if (fetching && currentPage < totalPage) {
            DishService.getDishes(size, currentPage, dispatch)
                .then((response) => {
                    dispatch(setCurrentPage(currentPage + 1))
                    dispatch(setTotalPage(parseInt(response ? response.headers['x-total-pages'] : '0')))
                })
                .finally(() => dispatch(setFetching(false)))
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [])

    const scrollHandler = () => {
        if ((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100 > scrollValueInPercent && currentPage < totalPage) {
            dispatch(setFetching(true))
        }
    }


    useEffect(() => {
        if (anchorId) {
            scroller.scrollTo(anchorId, {
                duration: 800,
                smooth: 'easeInOutQuart',
                offset: -60,
            });
        }
    }, [anchorId]);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredDishes = listDishes.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const shouldShowCategory = (category: string) => {
        return filteredDishes.some(item => item.category.category === category);
    };

    return (
        <div className="dishPage">
            <div className="dishPage__content">
                <Slider/>
                <SearchDishes onSearch={handleSearch}/>
                <div className="category-section">
                    {filteredDishes.length === 0 && <p className="dishPage__content_p">
                        Блюда не найдены
                    </p>}
                    {shouldShowCategory("SALAD") && (
                        <div>
                            <h2 id="category:1">Салаты</h2>
                            <ListDishes dishes={filteredDishes.filter(item => item.category.category === "SALAD")}/>
                        </div>
                    )}

                    {shouldShowCategory("ROLLS") && (
                        <div>
                            <h2 id="category:2">Роллы</h2>
                            <ListDishes dishes={filteredDishes.filter(item => item.category.category === "ROLLS")}/>
                        </div>
                    )}

                    {shouldShowCategory("SECOND_COURSES") && (
                        <div>
                            <h2 id="category:3">Вторые блюда</h2>
                            <ListDishes
                                dishes={filteredDishes.filter(item => item.category.category === "SECOND_COURSES")}/>
                        </div>
                    )}

                    {shouldShowCategory("PIZZA") && (
                        <div>
                            <h2 id="category:4">Пицца</h2>
                            <ListDishes dishes={filteredDishes.filter(item => item.category.category === "PIZZA")}/>
                        </div>
                    )}

                    {shouldShowCategory("DRINKS") && (
                        <div>
                            <h2 id="category:5">Напитки</h2>
                            <ListDishes dishes={filteredDishes.filter(item => item.category.category === "DRINKS")}/>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DishesPage;
