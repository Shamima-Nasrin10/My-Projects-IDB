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

@NgModule({
  declarations: [
    AppComponent,
    RawMaterialCreateComponent,
    RawMaterialListComponent,
    SupplierListComponent,
    SupplierCreateComponent
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
