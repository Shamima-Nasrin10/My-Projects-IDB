import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { RawMaterialCreateComponent } from './raw-materials/raw-material-create/raw-material-create.component';
import { RawMaterialListComponent } from './raw-materials/raw-material-list/raw-material-list.component';

const routes: Routes = [
  {
    path:"rawMaterial",component:RawMaterialCreateComponent
  },
  {
    path:"update/:id", component:RawMaterialCreateComponent
  },
  {
    path:"rawMaterialList", component:RawMaterialListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
