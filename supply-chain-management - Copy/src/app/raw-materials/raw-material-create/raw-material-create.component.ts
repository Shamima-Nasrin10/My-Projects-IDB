import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../model/raw-material.model';
import { SupplierModel } from '../../suppliers/model/supplier.model';
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
  existingRawMaterial?: string;

  constructor(
    private supplierService: SupplierService,
    private rawmaterialService: RawMaterialService,
    private route: ActivatedRoute

  ) { }

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

    });

    this.rawMaterialId = this.route.snapshot.params['id'];

    if (this.rawMaterialId) {
      this.rawmaterialService.getRawMaterial(this.rawMaterialId).subscribe({

        next: response => {
          this.rawMaterial = response;

        },
        error: error => {
          console.log(error);
        }

      });
    }

  }

  onSubmit() {

    let selectedSupplier: SupplierModel | undefined = undefined;
    
    if (this.suppliers && this.suppliers.length > 0) {
      for (let supplier of this.suppliers) {
        if (supplier.id === this.rawMaterial.supplier.id) {
          selectedSupplier = supplier;
          break;
        }
      }
    }

    if (selectedSupplier) {
      this.rawMaterial.supplier = selectedSupplier;
    }

    
    // else {
    //   this.rawmaterialService.addRawMaterial(this.rawMaterial).subscribe({

    //     next: response => {
    //       this.rawMaterial = new RawMaterial();
    //       alert('Save Successful');

    //     },
    //     error: error => {
    //       console.log(error);
    //     }
    //   })
    // }

     // Check if raw material already exists in stock
     this.rawmaterialService.getRawMaterialByName(this.rawMaterial.name).subscribe({
      next: existingRawMaterial => {
        if (existingRawMaterial) {
          // If it exists, update its quantity
          existingRawMaterial.quantity += this.rawMaterial.quantity;
          this.rawmaterialService.updateRawMaterial(existingRawMaterial.id, existingRawMaterial).subscribe({
            next: response => {
              this.rawMaterial = new RawMaterial();
              alert('Quantity updated successfully');
            },
            error: error => {
              console.log(error);
            }
          });
        } 
        else if (this.rawMaterialId) {
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
        
        else {
          // If it does not exist, add as a new raw material
          this.rawmaterialService.addRawMaterial(this.rawMaterial).subscribe({
            next: response => {
              this.rawMaterial = new RawMaterial();
              alert('Save successful');
            },
            error: error => {
              console.log(error);
            }
          });
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }


  }

