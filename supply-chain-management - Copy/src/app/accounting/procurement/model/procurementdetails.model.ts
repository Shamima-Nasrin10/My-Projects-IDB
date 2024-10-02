import {RawMaterial} from "../../../inventory/raw-materials/model/raw-material.model";
import {Procurement} from "./procurement.model";

export class ProcurementDetails{

  id!: number;
  procurement!: Procurement;
  rawMaterial!: RawMaterial;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;

}
