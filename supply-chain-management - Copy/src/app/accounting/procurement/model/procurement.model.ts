import {RawMaterial} from "../../../inventory/raw-materials/model/raw-material.model";
import {SupplierModel} from "../../../inventory/suppliers/model/supplier.model";

export class Procurement{
  id!: number;
  rawMaterialSupplier!: SupplierModel[];
  salesdate!: Date;
  totalprice!: number;
  quantity!: number;
  rawMaterial!: RawMaterial[];
}
