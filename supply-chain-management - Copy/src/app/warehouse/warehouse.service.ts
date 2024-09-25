import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../util/api.response";
import {WareHouse} from "./warehouse/warehouse.model";
import {Inventory} from "../inventory/inventory/model/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private apiUrl = 'http://localhost:8080/api/warehouse';

  constructor(private http: HttpClient) { }

  getAllWarehouses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  saveWarehouse(warehouse: WareHouse): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, warehouse);
  }

  updateWarehouse(warehouse: WareHouse): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, warehouse);
  }

  deleteWarehouseById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  findWarehouseById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  getInventoriesByWarehouseId(warehouseId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${warehouseId}/inventories`);
  }

  getProductsByInventoryId(inventoryId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/inventories/${inventoryId}/products`);
  }

}