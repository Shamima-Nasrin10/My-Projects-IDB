import { Customer } from "../../customer/model/customer.model";
import {ProductModel} from "../../product/model/product.model";
import { ManufacturingStage, OrderStage } from "./enum/enums";

export class Order {
  id!: number;
  quantity!: number;
  status!: OrderStage; // e.g., 'Pending', 'Approved', 'In Production', 'Completed'
  orderDate!: Date;
  customer!: Customer;
  product!: ProductModel;
  manufacturingStage!: ManufacturingStage;
}
