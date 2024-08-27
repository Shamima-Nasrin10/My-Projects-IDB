import { Customer} from "../../../user/customer/model/customer.model";
import { Product } from "../../../product/product/model/product.model";

export class Order {
  id!: number;
  customerId!: number;
  productId!: number;
  quantity!: number;
  status!: string; // e.g., 'Pending', 'Approved', 'In Production', 'Completed'
  orderDate!: Date;
  approvalDate?: Date;
  completionDate?: Date;
  rejectionReason?: string;
  customer!: Customer;
  product!: Product;
  currentStage!: string;
  notificationStatus!: string
}
