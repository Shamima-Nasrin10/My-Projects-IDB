import { Component, OnInit } from '@angular/core';
import { RawMaterial, Unit } from '../model/raw-material.model';
import { SupplierModel } from '../../suppliers/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import { RawMaterialService } from '../raw-material.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  imageFile?: File;

  constructor(
    private supplierService: SupplierService,
    private rawMaterialService: RawMaterialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.supplierService.getAllRawMaterialSuppliers().subscribe({
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

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  onSubmit() {
    const rawMaterialObservable = this.rawMaterialId
      ? this.rawMaterialService.updateRawMaterial(this.rawMaterial, this.imageFile)
      : this.rawMaterialService.saveRawMaterial(this.rawMaterial, this.imageFile);

    rawMaterialObservable.subscribe({
      next: response => {
        this.rawMaterial = new RawMaterial();
        this.router.navigate(['/rawMaterialList']);
      },
      error: error => {
        alert('Error printed on console');
        console.log(error);
      }
    });
  }


  onImageChange(event: any) {
    this.imageFile = event.target.files[0];
  }
}