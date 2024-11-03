import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { OrderComponent } from './order/order/order.component';
import { ProductComponent } from './product/product/product.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryDetailComponent,
    OrderComponent,
    ProductComponent,
    CustomerComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
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
