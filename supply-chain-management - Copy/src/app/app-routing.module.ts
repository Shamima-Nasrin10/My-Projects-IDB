import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawMaterialCreateComponent } from './inventory/raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './inventory/raw-materials/raw-material-list/raw-material-list.component';
import { SupplierCreateComponent } from './inventory/suppliers/supplier-create/supplier-create.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { RegistrationComponent } from './access/registration/registration/registration.component';
import { LoginComponent } from "./access/login/login/login.component";
import { LogoutComponent } from "./access/logout/logout/logout.component";
import { AuthGuard } from './access/auth.guard';
import { RoleGuard } from './access/role.guard';
import { UnauthorizedComponent } from './authentication/unauthorized/unauthorized.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { SupplierListComponent } from './inventory/suppliers/supplier-list/supplier-list.component';
import { RawMaterialCategoryCreateComponent } from './inventory/raw-material-category/raw-material-category-create/raw-material-category-create.component';
import { RawMaterialCategoryListComponent } from './inventory/raw-material-category/raw-material-category-list/raw-material-category-list.component';
import path from "node:path";
import {WarehouseComponent} from "./warehouse/warehouse/warehouse.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: "registration", component: RegistrationComponent
  },
  {
    path: 'unathorized', component: UnauthorizedComponent,
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "logout", component: LogoutComponent
  },
  {
    path:"warehouse", component: WarehouseComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterial", component: RawMaterialCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterial/:id", component: RawMaterialCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterial-list", component: RawMaterialListComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterialCategory", component: RawMaterialCategoryCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterialCategory/:id", component: RawMaterialCategoryCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "rawMaterialCategory-list", component: RawMaterialCategoryListComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "supplier", component: SupplierCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "supplier/:id", component: SupplierCreateComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "supplier-list", component: SupplierListComponent, canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'products/view/:id',
    component: ProductViewComponent
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'products/update/:id',
    component: ProductUpdateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: "notification", component: NotificationComponent
  },
  {
    path: "order-create", component: OrderCreateComponent
  },
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },

  {
    path: 'userprofile', component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
