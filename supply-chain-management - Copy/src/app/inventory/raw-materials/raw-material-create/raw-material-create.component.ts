import { Component, OnInit } from '@angular/core';
import { RawMaterial, Unit } from '../model/raw-material.model';
import { SupplierModel } from '../../suppliers/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import { RawMaterialService } from '../raw-material.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raw-material-create',
  templateUrl: './raw-material-create.component.html',
  styleUrls: ['./raw-material-create.component.css']
})
export class RawMaterialCreateComponent implements OnInit {

  rawMaterial: RawMaterial = new RawMaterial();
  suppliers?: SupplierModel[];
  units = Object.values(Unit);
  rawMaterialId?: number;
  existingRawMaterial?: string;
  imageFile: File | null = null;

  constructor(
    private supplierService: SupplierService,
    private rawMaterialService: RawMaterialService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
      this.rawMaterialService.findRawMaterialById(this.rawMaterialId).subscribe({
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
    if (this.rawMaterialId) {
      if (this.imageFile) {
        this.rawMaterialService.updateRawMaterial(this.rawMaterialId, this.rawMaterial, this.imageFile).subscribe({
          next: response => {
            this.rawMaterial = new RawMaterial();
            alert('Update Successful');
          },
          error: error => {
            console.log(error);
          }
        });
      } else {
        this.rawMaterialService.updateRawMaterial(this.rawMaterialId, this.rawMaterial).subscribe({
          next: response => {
            this.rawMaterial = new RawMaterial();
            alert('Update Successful');
          },
          error: error => {
            console.log(error);
          }
        });
      }
    } else {
      this.rawMaterialService.findRawMaterialsBySupplierName(this.rawMaterial.supplier?.companyName).subscribe({
        next: existingRawMaterials => {
          if (existingRawMaterials && existingRawMaterials.length > 0) {
            const existingRawMaterial = existingRawMaterials[0];
            existingRawMaterial.quantity += this.rawMaterial.quantity;
            if (this.imageFile) {
              this.rawMaterialService.updateRawMaterial(existingRawMaterial.id, existingRawMaterial, this.imageFile).subscribe({
                next: response => {
                  this.rawMaterial = new RawMaterial();
                  alert('Quantity updated successfully');
                },
                error: error => {
                  console.log(error);
                }
              });
            } else {
              this.rawMaterialService.updateRawMaterial(existingRawMaterial.id, existingRawMaterial).subscribe({
                next: response => {
                  this.rawMaterial = new RawMaterial();
                  alert('Quantity updated successfully');
                },
                error: error => {
                  console.log(error);
                }
              });
            }
          } else {
            if (this.imageFile) {
              this.rawMaterialService.saveRawMaterial(this.rawMaterial, this.imageFile).subscribe({
                next: response => {
                  this.rawMaterial = new RawMaterial();
                  alert('Save successful');
                },
                error: error => {
                  console.log(error);
                }
              });
            } else {
              this.rawMaterialService.saveRawMaterial(this.rawMaterial, this.imageFile).subscribe({
                next: response => {
                  this.rawMaterial = new RawMaterial();
                  alert('Save successful');
                },
                error: error => {
                  console.log(error);
                }
              });
            }
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  

  onImageChange(event: any) {
    this.imageFile = event.target.files[0];
  }
}