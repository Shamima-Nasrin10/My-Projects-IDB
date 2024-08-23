import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../model/raw-material.model';
import { SupplierModel } from '../../suppliers/supplier-list/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import { response } from 'express';
import { error } from 'console';
import { RawMaterialService } from '../raw-material.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raw-material-create',
  templateUrl: './raw-material-create.component.html',
  styleUrl: './raw-material-create.component.css'
})
export class RawMaterialCreateComponent implements OnInit {


  rawMaterial: RawMaterial = new RawMaterial();
  suppliers?: SupplierModel[];
  rawMaterialId?: number;

  constructor(
    private supplierService: SupplierService,
    private rawmaterialService: RawMaterialService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    //  let supplierModel: SupplierModel=new SupplierModel();
    //  this.rawMaterial.supplier= supplierModel;
    this.supplierService.getSuppliers().subscribe({

      next: response => {
        this.suppliers = response;

      },
      error: error => {
        console.log(error);
      }

    })

    this.rawMaterialId=this.route.snapshot.params['id'];
    
    if(this.rawMaterialId){
      this.rawmaterialService.getRawMaterial(this.rawMaterialId).subscribe({

        next: response => {
          this.rawMaterial = response;
  
        },
        error: error => {
          console.log(error);
        }
  
      })
    }

  }

  onSubmit() {

    const selectedSupplier = this.suppliers?.find(supplier => supplier.id === +this.rawMaterial.supplier.id);
    if (selectedSupplier) {
      this.rawMaterial.supplier = selectedSupplier;
    }
    

    if(this.rawMaterialId){
      this.rawmaterialService.updateRawMaterial(this.rawMaterialId, this.rawMaterial).subscribe({

        next: response => {
          this.rawMaterial = new RawMaterial();
          alert('Update Successful');
  
        },
        error: error => {
          console.log(error);
        }
      })

    }
    else{
      this.rawmaterialService.addRawMaterial(this.rawMaterial).subscribe({

        next: response => {
          this.rawMaterial = new RawMaterial();
          alert('Save Successful');
  
        },
        error: error => {
          console.log(error);
        }
      })
    }
    

  }



}
