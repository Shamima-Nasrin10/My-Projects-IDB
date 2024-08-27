import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent implements OnInit{
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  newOrder: Order = new Order();
  rejectionReason: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
  }

  addOrder(): void {
    this.orderService.addOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      // this.newOrder = new Order();
    });
  }

  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService.updateOrder(this.selectedOrder).subscribe(() => {
        this.selectedOrder = null;
        this.getOrders();
      });
    }
  }

  approveOrder(order: Order): void {
    this.orderService.approveOrder(order).subscribe(() => {
      this.getOrders();
    });
  }

  refuseOrder(order: Order): void {
    this.orderService.refuseOrder(order, this.rejectionReason).subscribe(() => {
      this.getOrders();
      this.rejectionReason = '';
    });
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.orders = this.orders.filter(o => o !== order);
      if (this.selectedOrder === order) {
        this.selectedOrder = null;
      }
    });
  }



}
