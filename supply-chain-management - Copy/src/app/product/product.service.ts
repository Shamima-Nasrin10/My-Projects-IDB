

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private baseUrl = 'http://localhost:3000/products';
  // stockUpdated: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  //
  // constructor(private http: HttpClient) { }
  //
  //
  // getProducts(): Observable<ProductModel[]> {
  //   return this.http.get<ProductModel[]>(this.baseUrl);
  // }
  //
  //
  // getProductById(id: string): Observable<ProductModel> {
  //   return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  // }
  //
  // addProduct(product: ProductModel): Observable<ProductModel> {
  //   return this.http.post<ProductModel>(this.baseUrl, product);
  // }
  //
  //
  // updateProduct(id: string, product: ProductModel): Observable<ProductModel> {
  //   return this.http.put<ProductModel>(`${this.baseUrl}/${id}`, product);
  // }
  //
  // deleteProduct(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }
  //
  // updateProductStock(productId: string, newStock: number): Observable<ProductModel> {
  //   return this.http.patch<ProductModel>(`${this.baseUrl}/${productId}`, { stock: newStock }).pipe(
  //     tap((updatedProduct) => {
  //       this.stockUpdated.emit(updatedProduct); // Emit event on stock update
  //     })
  //   );
  // }
}
