import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierModel } from '../model/supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  supplier: SupplierModel = new SupplierModel();
  supplierId?: number;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the supplier ID from the route if available
    this.supplierId = this.route.snapshot.params['id'];
    
    // If an ID exists, fetch the supplier data to edit
    if (this.supplierId) {
      this.supplierService.getSupplier(this.supplierId).subscribe({
        next: response => {
          this.supplier = response;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.supplierId) {
      // Update existing supplier
      this.supplierService.updateSupplier(this.supplierId, this.supplier).subscribe({
        next: response => {
          this.supplier = new SupplierModel();
          alert('Supplier update successful');
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      // Add new supplier
      this.supplierService.addSupplier(this.supplier).subscribe({
        next: response => {
          this.supplier = new SupplierModel();
          alert('Supplier save successful');
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

}

