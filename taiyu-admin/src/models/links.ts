import { Order } from "./order";

export interface Link{
    id: number;
    code: string;
    order: Order[];
}