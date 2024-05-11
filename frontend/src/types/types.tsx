//нужно точечнее раскидать интерфейсы, чтобы не было все в одном файле

export interface IProduct {
    id: number;
    category: string;
    productName: string;
    productDescription: string;
    urlImage: string;
    price: number;
    weight: number;
}

export interface IProductCategory {
    id: number;
    categoryName: string;
}

export interface IDishFromCart extends IProduct {
    quantity: number;
}

export interface IDishFromOrderResponse {
    dishId: number;
    dishName: string;
    quantity: number;
}

export interface IDishFromOrderHistory {
    orderId: number;
    dishId: number;
    dishName: string;
    quantity: number;
}

export interface IDeliveryInfo {
    clientName: string;
    clientPhoneNumber: string;
    description: string;
    address: string;
    flat: number;
    floor: number;
    frontDoor: number;
}

export interface IOrderFromHistory extends IDeliveryInfo {
    id: number;
    clientId: string;
    totalPrice: number;
    listDishesFromOrder: IDishFromOrderHistory[];
    status: string;
    orderTime: string;
    refusalReason: string | null;
}

export interface IOrderResponse extends IDeliveryInfo {
    clientId?: string;
    totalPrice: number;
    weight: number;
    listDishesFromOrder: IDishFromOrderResponse[];
}

export interface IUser {
    id: string;
    username: string;
    number: string;
    birthdate: Date;
    email: string;
}

export interface ITokens {
    refresh_token: string;
    access_token: string;
}

export interface IRegistration {
    username: string;
    number: string;
    birthdate: Date;
    email: string;
    password: string;
}

export interface ILogin {
    username: string;
    password: string;
}

export type ILanguages = {
    [key: string]: { nativeName: string };
};



