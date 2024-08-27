import { Order } from "../../../order/order-create/model/order.model";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  orders!: Order[];
}
