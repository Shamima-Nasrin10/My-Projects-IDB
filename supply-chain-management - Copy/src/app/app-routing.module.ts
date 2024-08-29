import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawMaterialCreateComponent } from './raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './raw-materials/raw-material-list/raw-material-list.component';
import { SupplierCreateComponent } from './suppliers/supplier-create/supplier-create.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { RegistrationComponent } from './access/registration/registration/registration.component';

const routes: Routes = [
  {
    path:"registration", component:RegistrationComponent
  },
  {
    path:"rawMaterial",component:RawMaterialCreateComponent
  },
  {
    path:"update/:id", component:RawMaterialCreateComponent
  },
  {
    path:"rawMaterialList", component:RawMaterialListComponent
  },
  {
    path:"addSupplier", component:SupplierCreateComponent
  },
  {
    path:"notification", component:NotificationComponent
  },
  {
    path:"orderCreate", component:OrderCreateComponent
  },
  {
    path:"customerList", component:CustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
