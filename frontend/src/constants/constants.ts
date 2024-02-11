import {IUserResponse} from "../types/types";

export const user: IUserResponse | null = JSON.parse(localStorage.getItem('user') || "null");