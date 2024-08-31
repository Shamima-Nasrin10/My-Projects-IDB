// src/app/components/customer-create/customer-create.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../customer/model/customer.model';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  newCustomer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer).subscribe(customer => {
      console.log('Customer created successfully:', customer);
      // Announce the new customer creation
      this.customerService.announceCustomerAdded(customer);
      this.newCustomer = new Customer(); // Reset form
      // Redirect back to the order creation page
      this.router.navigate(['/order-create']);
    });
  }

  cancel(): void {
    // Reset the form or navigate away
    this.router.navigate(['/order-create']); // Redirect to the order creation page or any other desired page
  }
}
