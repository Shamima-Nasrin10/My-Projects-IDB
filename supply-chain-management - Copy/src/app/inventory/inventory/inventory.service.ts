import { Injectable } from '@angular/core';
import {ApiResponse} from "../../util/api.response";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inventory} from "./model/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}


  saveInventory(inventory: Inventory, warehouseId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('warehouseId', warehouseId.toString());
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, inventory, { params });
  }


  getAllInventories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }


  getInventoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }


  updateInventory(id:number, inventory: Inventory, warehouseId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('warehouseId', warehouseId.toString());
    return this.http.put<ApiResponse>(`${this.apiUrl}/update/${id}`, inventory, { params });
  }


  deleteInventoryById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }


  getProductsByInventoryId(inventoryId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${inventoryId}/products`);
  }
}
