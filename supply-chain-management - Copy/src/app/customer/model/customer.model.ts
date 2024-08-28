import { Order } from "../../order/model/order.model";

export class Customer {
    id!: number;
    name!: string;
    email!: string;
    phone!: string;
    address!: string;
    photo!: string
    password!: string; // For login purposes
    orders!: Order[];  // Array to hold orders of this customer

    // constructor(id: number, name: string, email: string, phone: string, address: string, password: string, orders: Order[] = []) {
    //     this.id = id;
    //     this.name = name;
    //     this.email = email;
    //     this.phone = phone;
    //     this.address = address;
    //     this.password = password;
    //     this.orders = orders;
    // }
}

