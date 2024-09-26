
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from './model/product.model';
import {ApiResponse} from "../util/api.response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  saveProduct(product: Product): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, product);
  }


  getAllProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  getProductById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, product);
  }

  deleteProductById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  getProductsByInventoryId(productId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/getProductsByInventoryId?inventoryId=${productId}`);
  }

}
