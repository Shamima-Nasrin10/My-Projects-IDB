import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Order } from '../../order/model/order.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{

  customers: Customer[] = [];
    selectedCustomer: Customer | null = null;
    isEditing: boolean = false;
    newOrder: Order | null = null;

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    }

    selectCustomer(customer: Customer): void {
        this.selectedCustomer = customer;
        this.isEditing = true;
    }

    addCustomer(): void {
        // this.selectedCustomer = new Customer(0, '', '', '', '', '');
        this.selectedCustomer=new Customer();
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

    addOrderToCustomer(customer: Customer): void {
        if (this.newOrder) {
            this.customerService.addOrderToCustomer(customer.id, this.newOrder).subscribe(updatedCustomer => {
                customer.orders = updatedCustomer.orders;
                this.newOrder = null;
            });
        }
    }

}
