import {Component, OnInit} from '@angular/core';
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
export class WarehouseComponent implements OnInit{

  warehouse: WareHouse = new WareHouse();
  warehouses: WareHouse[] = [];
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();
  warehouseId?: number;

  dynamicClasses = {
    'dynamic-background': true,
    'dynamic-border': true
  };

  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  public loadWarehouse(id: number): void {
    this.warehouseService.findWarehouseById(id).subscribe({
      next: (response: ApiResponse) => {
        console.log('API Response:', response);
        if (response && response.success) {
          this.warehouse = response.data['warehouse'];
          console.log('Warehouse Loaded:', this.warehouse);
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
          this.inventories = response.data['inventories'];
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
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }


  public resetWarehouseForm(): void {
    this.warehouse = new WareHouse();
    this.loadWarehouses();
    //this.router.navigate(['/warehouse']);
  }

  deleteWarehouse(id: number): void {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.deleteWarehouseById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            this.resetWarehouseForm();
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
