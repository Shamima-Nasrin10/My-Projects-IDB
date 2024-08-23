import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { RawMaterialCreateComponent } from './raw-materials/raw-material-create/raw-material-create.component';

const routes: Routes = [
  {
    path:"rawMaterial",component:RawMaterialCreateComponent
  },
  {
    path:"update/:id", component:RawMaterialCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
