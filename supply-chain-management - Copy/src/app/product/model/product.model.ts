
export class Product {
  id!: number;
  name!: string;
  unitPrice!: number;
  stock!: number;
  batch?: string;
  inventoryId!: number;
  unit!: Unit;

}

export enum Unit {
  METER = 'METER',
  PIECE = 'PIECE',
  FEET = 'FEET',
  INCH = 'INCH',
  KG = 'KG',
  GRAM = 'GRAM'
}
