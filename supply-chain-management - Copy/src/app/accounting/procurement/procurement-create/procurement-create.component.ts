import {Component, OnInit} from '@angular/core';
import {ApiResponse} from "../../../util/api.response";
import {NotifyUtil} from "../../../util/notify.util";
import {Procurement} from "../model/procurement.model";
import {RawMaterial} from "../../../inventory/raw-materials/model/raw-material.model";
import {SupplierModel} from "../../../inventory/suppliers/model/supplier.model";
import {ProcurementService} from "../procuremet.service";
import {SupplierService} from "../../../inventory/suppliers/supplier.service";
import {RawMaterialService} from "../../../inventory/raw-materials/raw-material.service";

@Component({
  selector: 'app-procurement-create',
  templateUrl: './procurement-create.component.html',
  styleUrl: './procurement-create.component.css'
})
export class ProcurementCreateComponent implements OnInit{

  procurement: Procurement = new Procurement();
  rawMaterials: RawMaterial[] = [];
  suppliers: SupplierModel[] = [];

  constructor(private procurementService: ProcurementService,
              private supplierService: SupplierService,
              private rawMaterialService: RawMaterialService
  ) {
  }

  ngOnInit(): void {
    this.procurement.rawMaterial = [];
    this.loadRawMaterials();
    this.loadSuppliers();
  }
  loadRawMaterials(): void {
    this.rawMaterialService.getAllRawMaterials().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.rawMaterials = response.data['rawMaterials'];
          NotifyUtil.success(response);
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  // Fetch retailers from backend
  loadSuppliers(): void {
    this.supplierService.getAllRawMaterialSuppliers().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          console.log(response);
          this.suppliers = response.data['rawMaterialSuppliers'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  addRawMaterial(): void {
    const rawMaterial: RawMaterial = new RawMaterial();
    this.procurement.rawMaterial.push(rawMaterial);
  }

  removeRawMaterial(index: number): void {
    this.procurement.rawMaterial.splice(index, 1);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    let totalPrice = 0;
    this.procurement.rawMaterial.forEach((rawMaterial) => {
      const quantity = rawMaterial.quantity;
      const unitPrice = rawMaterial.price;
      if (quantity >= 0 && unitPrice >= 0) {
        totalPrice += quantity * unitPrice;
      }
    });
    this.procurement.totalprice = totalPrice;
  }

  saveProcurement(): void {
    console.log(this.procurement)
    this.procurementService.saveProcurement(this.procurement).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          NotifyUtil.success(response);
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  setRawMaterialDetails(rawMaterialId: number): void {
    const rawMaterial = this.rawMaterials.find((r) => r.id === rawMaterialId);
    if (rawMaterial) {
      this.procurement.rawMaterial.forEach((r) => {
        if (r.id === rawMaterialId) {
          r.price = rawMaterial.price;
        }
      });
    }
  }

}
