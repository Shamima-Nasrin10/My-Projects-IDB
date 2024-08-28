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
  customers: Customer[] = []; // List of customers for dropdown or selection
  products: Product[] = []; // List of products for dropdown or selection
  orderStages = Object.values(OrderStage); // List of order stages for dropdown or selection
  manufacturingStages = Object.values(ManufacturingStage); // List of manufacturing stages for dropdown or selection

  constructor(
    private orderService: OrderService,
    private customerService:CustomerService

  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getCustomers(); // Fetch customers to populate the customer dropdown
    // this.getProducts(); // Fetch products to populate the product dropdown
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  getCustomers(): void {
    // Assuming you have a CustomerService to fetch customers
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    // Placeholder code since CustomerService is not provided:
    
  }

  // getProducts(): void {
  //   // Assuming you have a ProductService to fetch products
  //   // this.productService.getProducts().subscribe(products => this.products = products);
  //   // Placeholder code since ProductService is not provided:
  //   this.products = [
  //     { id: 1, name: 'Product A', price: 100 },
  //     { id: 2, name: 'Product B', price: 200 }
  //   ];
  // }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
  }

  addOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = new Order(); // Reset the form after adding an order
    });
  }

  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService.updateOrder(this.selectedOrder).subscribe(() => {
        this.selectedOrder = null;
        this.getOrders(); // Refresh the list after updating
      });
    }
  }

  approveOrder(order: Order): void {
    this.orderService.updateOrderStatus(order.id, OrderStage.APPROVED).subscribe(() => {
      this.getOrders(); // Refresh the list after approval
    });
  }

  refuseOrder(order: Order): void {
    this.orderService.updateOrderStatus(order.id, OrderStage.REJECTED).subscribe(() => {
      this.getOrders(); // Refresh the list after refusal
      
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



}
