import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierModel } from '../model/supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  supplier: SupplierModel = {
    id: 0,
    companyName: '',
    contactPerson: '',
    email: '',
    cellNo: '',
    address: ''
  }; 
  supplierId?: number;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    this.supplierId = +this.route.snapshot.params['id']; 
    
    if (this.supplierId) {
      
      this.loadSupplier(this.supplierId);
    }
  }

  
  private loadSupplier(id: number): void {
    this.supplierService.getRawMaterialSupplierById(id).subscribe({
      next: (response: SupplierModel) => { 
        this.supplier = response;
      },
      error: (error) => {
        console.error('Error loading supplier', error);
        alert('Error loading supplier data');
      }
    });
  }

 
  onSubmit(): void {
    if (this.supplierId) {
      this.updateSupplier();
    } else {
      this.addSupplier();
    }
  }

 
  private addSupplier(): void {
    this.supplierService.saveRawMaterialSupplier(this.supplier).subscribe({
      next: () => {
        alert('Supplier saved successfully');
        this.resetForm();
        this.router.navigate(['/suppliers']); 
      },
      error: (error) => {
        console.error('Error saving supplier', error);
        alert('Failed to save supplier');
      }
    });
  }

  
  private updateSupplier(): void {
    if (this.supplierId) {
      this.supplierService.updateRawMaterialSupplier(this.supplier).subscribe({
        next: () => {
          alert('Supplier updated successfully');
          this.resetForm();
          this.router.navigate(['/suppliers']); 
        },
        error: (error) => {
          console.error('Error updating supplier', error);
          alert('Failed to update supplier');
        }
      });
    }
  }

  
  private resetForm(): void {
    this.supplier = {
      id: 0,
      companyName: '',
      contactPerson: '',
      email: '',
      cellNo: '',
      address: ''
    };
  }

}

