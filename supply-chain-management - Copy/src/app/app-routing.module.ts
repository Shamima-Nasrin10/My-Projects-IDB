import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawMaterialCreateComponent } from './raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './raw-materials/raw-material-list/raw-material-list.component';
import { SupplierCreateComponent } from './suppliers/supplier-create/supplier-create.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { RegistrationComponent } from './access/registration/registration/registration.component';
import {LoginComponent} from "./access/login/login/login.component";
import {LogoutComponent} from "./access/logout/logout/logout.component";
import { AdminComponent } from './user/admin/admin.component';
import { AuthGuard } from './access/auth.guard';
import { RoleGuard } from './access/role.guard';
import { UnauthorizedComponent } from './authentication/unauthorized/unauthorized.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';

const routes: Routes = [
  {
    path:"registration", component:RegistrationComponent
  },
  {
    path:'admin', component:AdminComponent, canActivate: [AuthGuard,RoleGuard], data:{expectedRole:'admin'}
  },
  {
    path:'unathorized', component:UnauthorizedComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  {
    path:"logout",component:LogoutComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/view/:id',
    component: ProductViewComponent
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'products/update/:id',
    component: ProductUpdateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' }
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
    path:"order-create", component:OrderCreateComponent
  },
  {
    path:"customerList", component:CustomerListComponent
  },
  {
    path:"customer-create", component:CustomerCreateComponent
  },
  {
    path:"order-list", component:CustomerListComponent
  },
  {
    path:'userprofile', component:UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
