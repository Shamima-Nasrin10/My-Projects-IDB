import {Component, OnInit} from '@angular/core';
import { NotifyUtil } from '../../../util/notify.util';
import {ApiResponse} from "../../../util/api.response";
import {InventoryService} from "../inventory.service";
import {Product} from "../../../product/model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Inventory} from "../model/inventory.model";
import {WareHouse} from "../../../warehouse/warehouse/warehouse.model";
import {WarehouseService} from "../../../warehouse/warehouse.service";

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent implements OnInit{
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();
  warehouses: WareHouse[] = [];
  products: Product[] = [];
  inventoryId?: number;
  selectedWarehouseId!: number;

  dynamicClasses = {
    'dynamic-background': true,
    'dynamic-border': true
  };

  constructor(
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ensure that inventory.warehouse is initialized as an empty WareHouse object
    this.inventory.warehouse = new WareHouse();

    this.loadInventories();
    this.loadWarehouses();
  }

  public loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.inventories = response.data['inventories'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.warehouses = response.data['warehouses'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadProductsByInventoryId(inventoryId: number): void {
    this.inventoryService.getProductsByInventoryId(inventoryId).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.products = response.data['products'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public onSubmit(): void {
    if (!this.inventory.warehouse || !this.inventory.warehouse.id) {
      NotifyUtil.error('Please select a warehouse before saving the inventory.');
      return;
    }

    const inventoryObservable = this.inventoryId
      ? this.inventoryService.updateInventory(this.inventory, this.inventory.warehouse.id)
      : this.inventoryService.saveInventory(this.inventory, this.inventory.warehouse.id);

    inventoryObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.resetInventoryForm();
          NotifyUtil.success(response);
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public resetInventoryForm(): void {
    this.inventory = new Inventory();
    this.inventory.warehouse = new WareHouse();  // Initialize warehouse again when resetting the form
    this.loadInventories();
    this.products = [];
    this.inventoryId = undefined;
    this.selectedWarehouseId = 0;
  }

  public deleteInventory(id: number): void {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventoryById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response.success) {
            this.resetInventoryForm();
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response.message);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

  public editInventory(inventory: Inventory): void {
    this.inventory = { ...inventory };
    this.inventoryId = inventory.id;

    if (!this.inventory.warehouse) {
      this.inventory.warehouse = new WareHouse();  // Ensure the warehouse is initialized
    }

    this.loadProductsByInventoryId(inventory.id);
  }

  public onSelectInventory(inventoryId: number): void {
    this.inventoryService.getInventoryById(inventoryId).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.inventory = response.data['inventory'];
          this.inventoryId = inventoryId;
          this.loadProductsByInventoryId(inventoryId); // Load products for the selected inventory
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }
}
