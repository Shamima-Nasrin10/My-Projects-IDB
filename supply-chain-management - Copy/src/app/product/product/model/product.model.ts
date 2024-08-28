import { Order } from "../../../order/model/order.model";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  orders!: Order[];
}
