// src/app/services/customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Customer } from './model/customer.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers'; // URL to your backend API

  // Subject to broadcast new customers
  private customerAddedSource = new Subject<Customer>();

  // Observable stream
  customerAdded$ = this.customerAddedSource.asObservable();

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer).pipe(
      tap((newCustomer: Customer) => this.announceCustomerAdded(newCustomer)) // Notify about the new customer
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Method to announce a new customer creation
  announceCustomerAdded(customer: Customer): void {
    this.customerAddedSource.next(customer);
  }
}
