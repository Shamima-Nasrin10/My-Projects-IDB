import {Component, OnInit} from '@angular/core';
import {Inventory, InventoryCategory} from "../model/inventory.model";
import { NotifyUtil } from '../../../util/notify.util';
import {ApiResponse} from "../../../util/api.response";
import {InventoryService} from "../inventory.service";
import {Product} from "../../../product/model/product.model";

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent implements OnInit{
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();
  products: Product[] = [];
  selectedInventoryId!: number;
  isEditMode: boolean = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventories();
  }


  loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe((response: ApiResponse) => {
      if (response.success) {
        this.inventories = response.data['inventories'];
      } else {
        NotifyUtil.error(response.message);
      }
    }, (error) => {
      NotifyUtil.error(error);
    });
  }

  saveInventory(): void {
    if (this.isEditMode && this.selectedInventoryId) {
      this.inventoryService.updateInventory(this.inventory, this.inventory.warehouse.id).subscribe((response: ApiResponse) => {
        if (response.success) {
          NotifyUtil.success(response);
          this.loadInventories();
          this.clearForm();
        } else {
          NotifyUtil.error(response.message);
        }
      }, (error) => {
        NotifyUtil.error(error);
      });
    } else {

      this.inventoryService.saveInventory(this.inventory, this.inventory.warehouse.id).subscribe((response: ApiResponse) => {
        if (response.success) {
          NotifyUtil.success(response);
          this.loadInventories();
          this.clearForm();
        } else {
          NotifyUtil.error(response.message);
        }
      }, (error) => {
        NotifyUtil.error(error);
      });
    }
  }

  editInventory(inventory: Inventory): void {
    this.isEditMode = true;
    this.inventory = { ...inventory };
    this.selectedInventoryId = inventory.id;
  }

  deleteInventory(id: number): void {
    if (confirm("Are you sure you want to delete this inventory?")) {
      this.inventoryService.deleteInventoryById(id).subscribe((response: ApiResponse) => {
        if (response.success) {
          NotifyUtil.success(response);
          this.loadInventories();
        } else {
          NotifyUtil.error(response.message);
        }
      }, (error) => {
        NotifyUtil.error(error);
      });
    }
  }

  onSelectInventory(inventoryId: number): void {
    this.selectedInventoryId = inventoryId;
    this.inventoryService.getProductsByInventoryId(inventoryId).subscribe((response: ApiResponse) => {
      if (response.success) {
        this.products = response.data['products'];
      } else {
        NotifyUtil.error(response.message);
      }
    }, (error) => {
      NotifyUtil.error(error);
    });
  }

  clearForm(): void {
    this.inventory = new Inventory();
    this.isEditMode = false;
    this.selectedInventoryId = 0;
    this.products = [];
  }

  protected readonly Inventory = Inventory;
  protected readonly InventoryCategory = InventoryCategory;
}
