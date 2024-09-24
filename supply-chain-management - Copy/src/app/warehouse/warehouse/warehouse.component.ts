import { Component } from '@angular/core';
import { NotifyUtil } from '../../util/notify.util';
import {ApiResponse} from "../../util/api.response";
import {WareHouse} from "./warehouse.model";
import {Inventory} from "../../inventory/inventory/model/inventory.model";
import {WarehouseService} from "../warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../../inventory/inventory/inventory.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {

  warehouse: WareHouse = new WareHouse();
  warehouses: WareHouse[] = [];
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();
  warehouseId?: number;

  constructor(
    private warehouseService: WarehouseService,
    private inventoryService: InventoryService,  // Inject InventoryService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.warehouseId = this.route.snapshot.params['id'];

    if (this.warehouseId) {
      this.loadWarehouse(this.warehouseId);
      this.loadInventories(this.warehouseId);  // Load inventories for this warehouse
    }

    this.loadWarehouses();  // Always load all warehouses
  }

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

  onSubmit(): void {
    const warehouseObservable = this.warehouseId
      ? this.warehouseService.updateWarehouse(this.warehouse)
      : this.warehouseService.saveWarehouse(this.warehouse);

    warehouseObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.resetWarehouseForm();
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

  private resetWarehouseForm(): void {
    this.warehouse = new WareHouse();  // Reset the form
    this.router.navigate(['/warehouses']);  // Optional: Redirect after save/update
  }

  deleteWarehouse(id: number): void {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.deleteWarehouseById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.loadWarehouses();  // Reload the list after deletion
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

  private resetInventoryForm(): void {
    this.inventory = new Inventory();
  }

}
