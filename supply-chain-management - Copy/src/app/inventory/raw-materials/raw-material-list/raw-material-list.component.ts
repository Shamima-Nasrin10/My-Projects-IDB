import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../model/raw-material.model';
import { RawMaterialService } from '../raw-material.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { SupplierModel } from '../../suppliers/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-raw-material-list',
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.css'
})
export class RawMaterialListComponent implements OnInit {

  rawmaterials: RawMaterial[] = [];
  suppliers?: SupplierModel[];

  constructor(
    private rawmaterialService: RawMaterialService,
    private supplierService: SupplierService,
  ) { }

  ngOnInit(): void {
    this.loadRawMaterials();
    this.fetchSuppliers();
  }

  loadRawMaterials(): void {
    this.rawmaterialService.getAllRawMaterials().subscribe({
      next: response => {
        this.rawmaterials = response.map(rawmaterial => Object.assign(new RawMaterial(), rawmaterial));
      },
      error: error => {
        console.error('Error loading raw materials:', error);
      }
    });
  }

  fetchSuppliers(): void {
    // Assuming you have a SupplierService to fetch suppliers
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  deleteRawMaterial(id: number): void {
    this.rawmaterialService.deleteRawMaterialById(id).subscribe({
      next: () => {
        // Optionally, provide user feedback or reload the list
        this.rawmaterials = this.rawmaterials.filter(material => material.id !== id);
        alert('Raw Material deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting raw material:', error);
        alert('Failed to delete raw material');
      }
    });
  }

}
