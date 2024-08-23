import { SupplierModel } from "../../suppliers/supplier-list/model/supplier.model"

export class RawMaterial{

    id!: number
    name!: string
    quantity!: number
    unit!: string
    supplier: SupplierModel = new SupplierModel()
    unitPrice!: number

}