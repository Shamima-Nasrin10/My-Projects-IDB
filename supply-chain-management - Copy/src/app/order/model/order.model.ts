import { Customer} from "../../user/customer/model/customer.model";
import { Product } from "../../product/product/model/product.model";

export class Order {
  id!: number;
  quantity!: number;
  status!: string; // e.g., 'Pending', 'Approved', 'In Production', 'Completed'
  orderDate!: Date;
  customer!: Customer;
  product!: Product;
  currentStage!: string;
  notificationStatus!: string
}
