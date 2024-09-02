
import { UserModel } from "../../access/userModel/user.model";
import {ProductModel} from "../../product/model/product.model";
import { ManufacturingStage, OrderStage } from "./enum/enums";

export class OrderModel {
  id!: string;                       
  userId!: number; // ID of the user placing the order
  userName!: string; // Name of the user placing the order
  phoneNumber!: string; // User's phone number for contact
  address!: string;              
  product!: ProductModel;             
  quantity!: number;
  unitPrice!: number;
  stock!: number;                  
  totalPrice!: number;               
  orderDate!: Date;                  
  requiredDeliveryDate?: Date;       
  status!: OrderStage;               
  manufacturingStage?: ManufacturingStage; 
}
