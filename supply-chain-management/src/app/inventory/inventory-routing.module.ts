import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';



@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InventoryModule { }
