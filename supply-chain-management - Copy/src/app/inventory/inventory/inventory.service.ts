import { Injectable } from '@angular/core';
import {ApiResponse} from "../../util/api.response";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inventory} from "./model/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';  // Base API URL

  constructor(private http: HttpClient) {}

  // Save a new inventory for a specific warehouse
  saveInventory(inventory: Inventory, warehouseId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('warehouseId', warehouseId.toString());
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, inventory, { params });
  }

  // Get all inventories
  getAllInventories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  // Get a specific inventory by its ID
  getInventoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  // Update an existing inventory for a specific warehouse
  updateInventory(inventory: Inventory, warehouseId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('warehouseId', warehouseId.toString());
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, inventory, { params });
  }

  // Delete an inventory by its ID
  deleteInventoryById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  // Get all products for a specific inventory by inventory ID
  getProductsByInventoryId(inventoryId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${inventoryId}/products`);
  }
}
