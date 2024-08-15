import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';

const routes: Routes = [
  { path: 'inventory', component:InventoryListComponent },
  { path: 'inventoryDetail/:id', component:InventoryDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
