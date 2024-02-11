import {Rate as AntRate} from 'antd';
import React, {FC} from "react";

/**
 * Оценка заказа
 * @constructor
 */
const Rate: FC = () => <AntRate allowHalf defaultValue={2.5}/>;
export default Rate;
