import React, {FC, useState} from 'react';
import {Input} from 'antd';
import './styles/SearchDishes.css';

const {Search} = Input;

interface SearchDishesProps {
    onSearch: (value: string) => void;
}

/**
 * Поисковик блюд в меню
 * @constructor
 */
const SearchDishes: FC<SearchDishesProps> =
    ({
         onSearch
     }) => {
        const [searchText, setSearchText] = useState('');

        const handleSearch = () => {
            onSearch(searchText);
        };

        return (
            <div className="searchDishes">
                <Search
                    className="searchDishes__search"
                    placeholder="Поиск блюд..."
                    value={searchText}
                    allowClear
                    enterButton
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={handleSearch}
                />
            </div>
        );
    };

export default SearchDishes;
