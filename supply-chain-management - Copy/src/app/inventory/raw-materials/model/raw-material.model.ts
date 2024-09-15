import { SupplierModel } from "../../suppliers/model/supplier.model"

export class RawMaterial{

    id!: number
    name!: string
    quantity!: number
    unit!: string
    supplier: SupplierModel = new SupplierModel()
    unitPrice!: number

}