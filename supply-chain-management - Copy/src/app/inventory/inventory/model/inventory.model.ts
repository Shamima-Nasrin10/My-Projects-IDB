import {WareHouse} from "../../../warehouse/warehouse/warehouse.model";
import {Product} from "../../../product/model/product.model";


export class Inventory {
  id!: number;
  name!: string;
  capacity!: number;
  products!: Product[];
  warehouse!:WareHouse;
  category!: InventoryCategory;
}

export enum InventoryCategory {
  PRODUCT = 'PRODUCT',
  RAW_MATERIAL = 'RAW_MATERIAL'
}



