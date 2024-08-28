import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Order } from './model/order.model';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/model/noification.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL to JSON server

  constructor(private http: HttpClient) {}

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Get order by ID
  getOrderById(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Update an existing order
  updateOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put<Order>(url, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Delete an order
  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Other business logic methods related to orders can be added here
  // For example, to update the status of an order:
  updateOrderStatus(id: number, status: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.patch<Order>(url, { status }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
