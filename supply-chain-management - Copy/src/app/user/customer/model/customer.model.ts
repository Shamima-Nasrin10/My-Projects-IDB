import { Order } from "../../../order/order-create/model/order.model";


export class Customer {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  address!: string;
  orders!: Order[];
}
