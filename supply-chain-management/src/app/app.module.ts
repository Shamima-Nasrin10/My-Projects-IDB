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
import { UserComponent } from './user/user.component';
import {LoginComponent} from "./login/login.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavContainer, MatSidenavContent, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryDetailComponent,
    OrderComponent,
    ProductComponent,
    CustomerComponent,
    UserComponent,
    SidebarComponent,
    DashboardComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LoginComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavContent,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatIcon
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    ),
    provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
