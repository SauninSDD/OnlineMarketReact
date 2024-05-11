import {ITokens} from "@/types/types";

export const user: ITokens | null = JSON.parse(localStorage.getItem('user') || "null");