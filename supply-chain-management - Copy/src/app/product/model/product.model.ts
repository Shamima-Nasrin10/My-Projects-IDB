
export class ProductModel {
  id!: number;
  name!: string;
  unitPrice!: number;
  stock!: number;
  batch?: string;  // Optional field
  inventoryId!: number;  // Refers to the inventory to which this product belongs
  unit!: Unit;  // Enum field

}

export enum Unit {
  METER = 'METER',
  PIECE = 'PIECE',
  FEET = 'FEET',
  INCH = 'INCH',
  KG = 'KG',
  GRAM = 'GRAM'
}
