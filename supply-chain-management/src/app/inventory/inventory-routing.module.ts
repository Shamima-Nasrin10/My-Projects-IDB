import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class InventoryModule { }
