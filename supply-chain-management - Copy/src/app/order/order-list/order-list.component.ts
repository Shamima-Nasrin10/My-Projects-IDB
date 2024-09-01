
import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { OrderService } from '../order.service';
import { OrderStage, ManufacturingStage } from '../model/enum/enums';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderModel[] = [];
  isAdmin: boolean = false; 
  status = OrderStage;
  manufacturingStages = Object.values(ManufacturingStage); 

  constructor(
    private orderService: OrderService,
    private authService:AuthService

  ) {}

  ngOnInit(): void {
    this.checkAdminRole(); 
    this.getOrders();
  }

  checkAdminRole(): void {
    const currentUser = this.authService.getUserProfileFromStorage();
    if (currentUser && currentUser.role === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        if (this.isAdmin) {
          this.orders = orders; 
        } else {
          
          const currentUser = this.authService.getUserProfileFromStorage();
          this.orders = orders.filter(order => order.userId === currentUser?.id);
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
       
      }
    });
  }

  approveOrder(order: OrderModel): void {
    if (this.isAdmin) {
      this.orderService.approveOrder(order.id).subscribe({
        next: (updatedOrder) => {
          order.status = updatedOrder.status;
          // Optionally show a success message
        },
        error: (err) => {
          console.error('Error approving order:', err);
          // Handle error: show error message to the user
        }
      });
    } else {
      // Show a message indicating the user does not have permission to approve orders
      console.warn('Only admins can approve orders.');
    }
  }

  rejectOrder(order: OrderModel): void {
    if (this.isAdmin) {
      this.orderService.rejectOrder(order.id).subscribe({
        next: (updatedOrder) => {
          order.status = updatedOrder.status;
         
        },
        error: (err) => {
          console.error('Error rejecting order:', err);
         
        }
      });
    } else {
     
      console.warn('Only admins can reject orders.');
    }
  }

  updateManufacturingStage(order: OrderModel): void {
    if (this.isAdmin) {
      this.orderService.updateManufacturingStage(order.id, order.manufacturingStage!).subscribe({
        next: (updatedOrder) => {
          order.manufacturingStage = updatedOrder.manufacturingStage;
         
        },
        error: (err) => {
          console.error('Error updating manufacturing stage:', err);
          
        }
      });
    } else {
      
      console.warn('Only admins can update the manufacturing stage.');
    }
  }
}
