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

  // Fetch all warehouses
  getAllWarehouses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  // Save a new warehouse
  saveWarehouse(warehouse: WareHouse): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, warehouse);
  }

  // Update an existing warehouse
  updateWarehouse(warehouse: WareHouse): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, warehouse);
  }

  // Delete a warehouse by its ID
  deleteWarehouseById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  // Find a specific warehouse by ID
  findWarehouseById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  // Add inventory to a warehouse by warehouse ID
  addInventoryToWarehouse(warehouseId: number, inventory: Inventory): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/${warehouseId}/inventory/add`, inventory);
  }

  // Fetch inventories by warehouse ID
  getInventoriesByWarehouseId(warehouseId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${warehouseId}/inventories`);
  }
}
