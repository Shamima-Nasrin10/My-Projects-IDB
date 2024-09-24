import {Inventory} from "../../inventory/inventory/model/inventory.model";

export class WareHouse{
  id!: number;
  name!: string;
  location!: string;
  inventories!: Inventory[];
}
