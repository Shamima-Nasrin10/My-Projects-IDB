import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';
import { Customer} from '../../customer/model/customer.model';
import { Product } from '../../product/product/model/product.model';
import { OrderStage } from '../model/enum/enums';
import { ManufacturingStage } from '../model/enum/enums';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent implements OnInit{
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  newOrder: Order = new Order();
  customers: Customer[] = []; 
  products: Product[] = []; 
  status = OrderStage; 
  manufacturingStages = ManufacturingStage; 
  isAdmin: boolean = true;

  constructor(
    private orderService: OrderService,
    private customerService:CustomerService

  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getCustomers(); 
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  getCustomers(): void {
    
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    
    
  }

  // getProducts(): void {
  //   // Assuming you have a ProductService to fetch products
  //   // this.productService.getProducts().subscribe(products => this.products = products);
  //   ];
  // }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
  }

  addOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = new Order(); 
    });
  }

  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService.updateOrder(this.selectedOrder).subscribe(() => {
        this.selectedOrder = null;
        this.getOrders(); 
      });
    }
  }

  approveOrder(order: Order): void {
    this.orderService.updateOrderStatus(order.id, OrderStage.APPROVED).subscribe(() => {
      this.getOrders(); 
    });
  }

  refuseOrder(order: Order): void {
    this.orderService.updateOrderStatus(order.id, OrderStage.REJECTED).subscribe(() => {
      this.getOrders(); 
      
    });
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.orders = this.orders.filter(o => o !== order);
      if (this.selectedOrder === order) {
        this.selectedOrder = null;
      }
    });
  }

  // getCustomerName(customerId: number): string {
  //   const customer = this.customers.find(c => c.id === customerId);
  //   return customer ? customer.name : 'Unknown';
  // }



}
