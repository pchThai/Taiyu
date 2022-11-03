import { OrderItem } from "./order-items";

export interface Order{
    id:number;
    name:string;
    email:string;
    total: number;
    order_items:OrderItem[];
}