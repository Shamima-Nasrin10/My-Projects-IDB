// src/app/components/order-create/order-create.component.ts

import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';
import { CustomerService } from '../../customer/customer.service';
import { ProductService } from '../../product/product.service';
import { Customer } from '../../customer/model/customer.model';
import { ProductModel } from '../../product/model/product.model';
import { OrderStage } from '../model/enum/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  newOrder: Order = new Order();
  customers: Customer[] = [];
  products: ProductModel[] = [];
  totalPrice: number = 0;
  stockError: boolean = false;
  hasCustomerProfile: boolean = false;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkCustomerProfile();
    this.getProducts();
    this.newOrder.status = OrderStage.PENDING; // Set default status to Pending
  }

  // Check if customer profile exists
  checkCustomerProfile(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      if (this.customers.length > 0) {
        this.hasCustomerProfile = true;
        this.newOrder.customer = this.customers[0]; // Assign the first customer (or logic to select)
      } else {
        this.hasCustomerProfile = false;
        // Redirect to customer creation if no profile exists
        this.router.navigate(['/customer-create']);
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  updatePrice(): void {
    if (this.newOrder.product && this.newOrder.quantity) {
      this.stockError = this.newOrder.quantity > this.newOrder.product.stock;
      if (!this.stockError) {
        this.totalPrice = this.newOrder.product.price * this.newOrder.quantity;
      } else {
        this.totalPrice = 0; // Reset total price if there's a stock error
      }
    }
  }

  addOrder(): void {
    if (!this.hasCustomerProfile) {
      // If no customer profile exists, redirect to customer creation
      window.alert("Please create a customer profile before placing an order.");
      this.router.navigate(['/customer-create']);
      return;
    }

    if (!this.stockError) {
      this.newOrder.orderDate = new Date(); 
      this.newOrder.totalPrice = this.totalPrice; 
      this.orderService.createOrder(this.newOrder).subscribe(order => {
        console.log('Order created successfully:', order);
        this.newOrder = new Order(); // Reset form
        this.totalPrice = 0; // Reset total price
      });
    }
  }
}
