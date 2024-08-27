import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Order } from './order-create/model/order.model';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/model/noification.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL to JSON server

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  addOrder(order: Order): Observable<Order> {
    order.notificationStatus = 'Pending Approval';
    return this.http.post<Order>(this.apiUrl, order, this.httpOptions).pipe(
      tap((newOrder: Order) => {
        const notification: Notification = {
          id: 0,
          orderId: newOrder.id,
          message: `New order placed by customer ${newOrder.customerId}`,
          status: 'Unread',
          createdAt: new Date()
        };
        this.notificationService.addNotification(notification).subscribe();
      })
    );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put<Order>(url, order, this.httpOptions);
  }

  approveOrder(order: Order): Observable<Order> {
    order.status = 'Approved';
    order.notificationStatus = 'Notified';
    order.approvalDate = new Date();
    return this.updateOrder(order);
  }

  deleteOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Order>(url, this.httpOptions);
  }

  refuseOrder(order: Order, reason: string): Observable<Order> {
    order.status = 'Refused';
    order.notificationStatus = 'Notified';
    order.rejectionReason = reason;
    return this.updateOrder(order);
  }
}
