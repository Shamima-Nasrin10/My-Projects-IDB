// src/app/components/customer-list/customer-list.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  isEditing: boolean = false;
  private customerAddedSubscription: Subscription;
  
  
  isAdmin: boolean = false; 

  constructor(private customerService: CustomerService) {
    
    this.customerAddedSubscription = this.customerService.customerAdded$.subscribe(
      (customer) => {
        this.customers.push(customer);
      }
    );
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
   
    this.customerAddedSubscription.unsubscribe();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  selectCustomer(customer: Customer): void {
    if (!this.isAdmin) { 
      this.selectedCustomer = customer;
      this.isEditing = true;
    } else {
      this.viewCustomer(customer); 
    }
  }

  viewCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isEditing = false;
  }

  addCustomer(): void {
    this.selectedCustomer = new Customer();
    this.isEditing = true;
  }

  saveCustomer(customer: Customer): void {
    if (customer.id) {
      this.customerService.updateCustomer(customer).subscribe(() => this.getCustomers());
    } else {
      this.customerService.createCustomer(customer).subscribe(() => this.getCustomers());
    }
    this.isEditing = false;
    this.selectedCustomer = null;
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.id).subscribe(() => this.getCustomers());
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.selectedCustomer = null;
  }
}
