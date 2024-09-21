import { SupplierModel } from "../../suppliers/model/supplier.model"

export class RawMaterial{

    id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  unit!: Unit;
  image!: string;
  supplier: SupplierModel = new SupplierModel();

}

export enum Unit{
    METER,
    PIECE,
    FEET,
    INCH,
    KG,
    GRAM
}