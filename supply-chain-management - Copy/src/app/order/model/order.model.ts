import { Customer } from "../../customer/model/customer.model";
import { Product } from "../../product/product/model/product.model";
import { ManufacturingStage, OrderStage } from "./enum/enums";

export class Order {
  id!: number;
  quantity!: number;
  status!: OrderStage; // e.g., 'Pending', 'Approved', 'In Production', 'Completed'
  orderDate!: Date;
  customer!: Customer;
  product!: Product;
  manufacturingStage!: ManufacturingStage;


//   constructor(id: number, customer: Customer, product: Product, quantity: number, orderDate: Date, status: OrderStage, currentStage: ManufacturingStage) {
//     this.id = id;
//     this.customer = customer;
//     this.product = product;
//     this.quantity = quantity;
//     this.orderDate = orderDate;
//     this.status = status;
// }
}
