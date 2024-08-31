import { Customer } from "../../customer/model/customer.model";
import {ProductModel} from "../../product/model/product.model";
import { ManufacturingStage, OrderStage } from "./enum/enums";

export class Order {
  id!: number;                       
  customer!: Customer;              
  product!: ProductModel;             
  quantity!: number;                  
  totalPrice!: number;               
  orderDate!: Date;                  
  requiredDeliveryDate?: Date;       
  status!: OrderStage;               
  manufacturingStage?: ManufacturingStage; 
}
