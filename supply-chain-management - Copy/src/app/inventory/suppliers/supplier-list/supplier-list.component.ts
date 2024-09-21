import { Component } from '@angular/core';
import { SupplierModel } from '../model/supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {

  suppliers: SupplierModel[] = []; 
  errorMessage: string = '';

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

 
  private loadSuppliers(): void {
    this.supplierService.getAllRawMaterialSuppliers().subscribe({
      next: (response: SupplierModel[]) => {
        this.suppliers = response; 
      },
      error: (error) => {
        console.error('Error fetching supplier list', error);
        this.errorMessage = 'Failed to load supplier list';
      }
    });
  }

 
  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteRawMaterialSupplier(id).subscribe({
        next: () => {
          alert('Supplier deleted successfully');
          this.loadSuppliers(); 
        },
        error: (error) => {
          console.error('Error deleting supplier', error);
          this.errorMessage = 'Failed to delete supplier';
        }
      });
    }
  }

}
