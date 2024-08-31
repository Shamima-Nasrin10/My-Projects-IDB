// src/app/components/order-create/order-create.component.ts

import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';
import { CustomerService } from '../../customer/customer.service';
import { ProductService } from '../../product/product.service';
import { ProductModel } from '../../product/model/product.model';
import { OrderStage } from '../model/enum/enums';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  newOrder: Order = new Order();
  products: ProductModel[] = [];
  totalPrice: number = 0;
  stockError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthenticationAndSetUserProfile();
    this.getProducts();
    this.newOrder.status = OrderStage.PENDING; // Set default status to Pending
  }

  // Check if customer profile exists
  checkAuthenticationAndSetUserProfile(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const currentUser = this.authService.getUserProfileFromStorage();
      if (currentUser) {
        this.newOrder.userId = +currentUser.id; // Set userId from user profile
        this.newOrder.userName = currentUser.name; // Set userName from user profile
      }
    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
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
    if (!this.stockError) {
      this.newOrder.orderDate = new Date(); 
      this.newOrder.totalPrice = this.totalPrice; 
      this.orderService.createOrder(this.newOrder).subscribe({
        next: (order) => {
          console.log('Order created successfully:', order);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating order:', error);
        }
      });
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
  resetForm(): void {
    this.newOrder = {} as Order; // Reset form
    this.totalPrice = 0; // Reset total price
  }
}
