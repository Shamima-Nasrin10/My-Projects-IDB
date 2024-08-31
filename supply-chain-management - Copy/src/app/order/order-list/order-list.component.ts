// src/app/components/order-list/order-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../order.service';
import { OrderStage, ManufacturingStage } from '../model/enum/enums';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  isAdmin: boolean = true; // Assume admin for this example
  status = OrderStage;
  manufacturingStages = Object.values(ManufacturingStage); // Get all enum values

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  approveOrder(order: Order): void {
    this.orderService.approveOrder(order.id).subscribe(updatedOrder => {
      order.status = updatedOrder.status;
    });
  }

  rejectOrder(order: Order): void {
    this.orderService.rejectOrder(order.id).subscribe(updatedOrder => {
      order.status = updatedOrder.status;
    });
  }

  updateManufacturingStage(order: Order): void {
    if (this.isAdmin) {
      this.orderService.updateManufacturingStage(order.id, order.manufacturingStage!).subscribe(updatedOrder => {
        order.manufacturingStage = updatedOrder.manufacturingStage;
      });
    }
  }
}
