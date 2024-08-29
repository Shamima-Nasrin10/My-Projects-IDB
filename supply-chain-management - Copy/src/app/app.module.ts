import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RawMaterialCreateComponent } from './raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './raw-materials/raw-material-list/raw-material-list.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './suppliers/supplier-create/supplier-create.component';
import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { AdminComponent } from './user/admin/admin.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { LoginComponent } from './access/login/login/login.component';
import { LogoutComponent } from './access/logout/logout/logout.component';
import { RegistrationComponent } from './access/registration/registration/registration.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RawMaterialCreateComponent,
    RawMaterialListComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NotificationComponent,
    OrderCreateComponent,
    AdminComponent,
    CustomerListComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductViewComponent,
    UserProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    )

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
