import { Component } from '@angular/core';
import { NotifyUtil } from '../../util/notify.util';
import {ApiResponse} from "../../util/api.response";
import {WareHouse} from "./warehouse.model";
import {Inventory} from "../../inventory/inventory/model/inventory.model";
import {WarehouseService} from "../warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {

  warehouse: WareHouse = new WareHouse();
  warehouses: WareHouse[] = [];
  inventories: Inventory[] = [];  // New list of inventories
  inventory: Inventory = new Inventory();  // New inventory to add

  warehouseId?: number;

  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.warehouseId = this.route.snapshot.params['id'];

    // Load warehouse for edit if ID is present
    if (this.warehouseId) {
      this.loadWarehouse(this.warehouseId);
      this.loadInventories(this.warehouseId);  // Load inventories for this warehouse
    }

    // Load the list of warehouses
    this.loadWarehouses();
  }

  // Load the specific warehouse for editing
  private loadWarehouse(id: number): void {
    this.warehouseService.findWarehouseById(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.warehouse = response.data['warehouse'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  // Load all warehouses
  private loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.warehouses = response.data['warehouses'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  // Handle warehouse creation or update
  onSubmit(): void {
    const warehouseObservable = this.warehouseId
      ? this.warehouseService.updateWarehouse(this.warehouse)
      : this.warehouseService.saveWarehouse(this.warehouse);

    warehouseObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.warehouse = new WareHouse();
          NotifyUtil.success(response);
          this.loadWarehouses();  // Reload the list after saving or updating
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  // Delete a warehouse
  deleteWarehouse(id: number): void {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.deleteWarehouseById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.loadWarehouses(); // Reload the list after deletion
          } else {
            NotifyUtil.error(response);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

  // Load inventories for a specific warehouse
  private loadInventories(warehouseId: number): void {
    this.warehouseService.getInventoriesByWarehouseId(warehouseId).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.inventories = response.data['inventories'];  // Load existing inventories
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  // Add a new inventory to the warehouse
  addInventory(): void {
    if (this.warehouseId) {
      this.warehouseService.addInventoryToWarehouse(this.warehouseId, this.inventory).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            this.inventories.push(this.inventory);  // Add to local list
            this.inventory = new Inventory();  // Reset the inventory form
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

}
