// order-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../authentication/auth.service';
import { OrderService } from '../order.service';
import { ProductService } from '../../product/product.service';
import { OrderModel } from '../model/order.model';
import { UserModel } from '../../access/userModel/user.model';
import { ProductModel } from '../../product/model/product.model';
import { OrderStage } from '../model/enum/enums';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  orderForm!: FormGroup;
  currentUser: UserModel | null = null;
  products: ProductModel[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserProfileFromStorage();

    if (!this.currentUser || this.currentUser.role !== 'customer') {
      this.errorMessage = 'You must be logged in as a customer to place an order.';
      return;
    }

    // Initialize the order form
    this.orderForm = this.fb.group({
      userId: [this.currentUser.id, Validators.required],
      userName: [this.currentUser.name, Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only allow numbers
      address: ['', Validators.required],
      product: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalPrice: [{ value: 0, disabled: true }],
      orderDate: [new Date(), Validators.required],
      requiredDeliveryDate: [null]
    });

    // Fetch available products
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    });

    // Calculate total price when quantity or product changes
    this.orderForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.orderForm.get('product')?.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  calculateTotalPrice(): void {
    const selectedProduct = this.orderForm.get('product')?.value as ProductModel;
    const quantity = this.orderForm.get('quantity')?.value;
    const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
    this.orderForm.patchValue({ totalPrice });
  }

  placeOrder(): void {
    if (this.orderForm.valid) {
      const order: OrderModel = {
      
        ...this.orderForm.value,
        
        status: OrderStage.PENDING // Default status on order creation
      };
 
      console.log("Order is "+order)

      this.orderService.placeOrder(order).subscribe({
        next: (res) => {
          console.log('Order placed successfully:', res);
          this.errorMessage = '';
          // Optionally reset the form or redirect
          this.orderForm.reset({
            userId: this.currentUser?.id,
            userName: this.currentUser?.name,
            phoneNumber: '',
            address: '',
            product: null,
            quantity: 1,
            totalPrice: 0,
            orderDate: new Date(),
            requiredDeliveryDate: null
          });
        },
        error: (err) => {
          console.error('Error placing order:', err);
          this.errorMessage = 'Failed to place order. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
