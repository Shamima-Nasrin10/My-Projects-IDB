import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../order/model/order.model';
import { Customer } from './model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:3000/customers'; // Replace with actual API endpoint

    constructor(private http: HttpClient) { }

    // Create a new customer
    createCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.apiUrl, customer, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    // Get all customers
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.apiUrl);
    }

    // Get a customer by ID, including their orders
    getCustomerById(id: number): Observable<Customer> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Customer>(url);
    }

    // Update a customer, including their orders
    updateCustomer(customer: Customer): Observable<Customer> {
        const url = `${this.apiUrl}/${customer.id}`;
        return this.http.put<Customer>(url, customer, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    // Delete a customer
    deleteCustomer(id: number): Observable<{}> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }

    // Add an order for a customer
    addOrderToCustomer(customerId: number, order: Order): Observable<Customer> {
        const url = `${this.apiUrl}/${customerId}/orders`;
        return this.http.post<Customer>(url, order, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }
}
