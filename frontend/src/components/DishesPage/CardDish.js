import React, {useState} from 'react';
import {Button, InputNumber, Modal, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, rewoveFromCart, updateAmount} from "../../slices/cartSlice"

const CardDish = ({dish}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const itemFromCartById = (useSelector((state) => state.cart.items.find(item => item.id === dish.id)))
    const handleAddClick = () => {
        dispatch(addProduct(dish))
    }

    const handleUpdateAmount = (dishId, amount) => {
        dispatch(updateAmount({dishId, amount}))
        if (amount === 0) {
            dispatch(rewoveFromCart(dishId))
        }
    }

    return (
        <div>
            <img
                src={dish.urlImage}
                alt={"Изображение блюда:" + dish.name}
                style={{width: "200px", height: "150px", cursor: "pointer"}}
                onClick={() => {
                    setIsModalOpen(true)
                }}
            />
            <div className={"cardDish__title"}>
                <div>{dish.name}</div>
                <div>{dish.price} руб.</div>
            </div>

            <Button
                type="link"
                shape="circle"
                onClick={() => {
                    setIsModalOpen(true)
                }}
            >
                Выбрать
            </Button>

            <Modal
                title={dish.name}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                footer={null}
            >
                <div style={{display: "flex"}}>
                    <div style={{flex: 1}}>
                        <img
                            src={dish.urlImage}
                            alt={'Фото ' + dish.name}
                            style={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "500px",
                            }}
                        />
                    </div>
                    <div style={{flex: 1, marginLeft: "20px"}}>
                        <p>{dish.weight} гр.</p>
                        <Tooltip
                            placement={"bottom"}
                            arrowContentStyle={"0px"}
                            title={dish.description}
                        >
                            <Button type={"link"}>
                                <span style={{color: "black", textDecoration: "underline", textUnderlineOffset: "3px"}}>
                                    Состав
                                </span>
                            </Button>
                        </Tooltip>
                        <div>
                            <p>{dish.price} руб.</p>
                            {itemFromCartById ? (
                                <InputNumber
                                    value={itemFromCartById.amount}
                                    min={0}
                                    onChange={(amount) => handleUpdateAmount(dish.id, amount)}
                                />
                            ) : (
                                <Button
                                    onClick={handleAddClick}
                                    type={"primary"}
                                    danger
                                    shape={"round"}
                                    size={"large"}
                                >
                                    Добавить в корзину
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CardDish;
