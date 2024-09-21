import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModel } from './model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService{

 private apiUrl = 'http://localhost:8080/api/supplier';

  constructor(private http: HttpClient) { }
  

  getSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.apiUrl + '/list');
  }

  getSupplier(id: number): Observable<SupplierModel> {
    return this.http.get<SupplierModel>(`${this.apiUrl}/${id}`);
  }

  addSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(this.apiUrl + '/save', supplier);
  }

  updateSupplier(id: number, supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.apiUrl}/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
