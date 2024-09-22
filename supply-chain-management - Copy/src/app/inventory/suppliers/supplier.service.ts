import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModel } from './model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService{

  apiUrl:String = 'http://localhost:8080/api/supplier';  

  constructor(private http: HttpClient) { }

  
  // private getHttpOptions() {
  //   const token = localStorage.getItem('token');
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`  
  //     })
  //   };
  // }

 
  getAllRawMaterialSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${this.apiUrl}/list`);
  }

 
  saveRawMaterialSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(`${this.apiUrl}/save`, supplier);
  }

  
  deleteRawMaterialSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  
  getRawMaterialSupplierById(id: number): Observable<SupplierModel> {
    return this.http.get<SupplierModel>(`${this.apiUrl}/${id}`);
  }

  
  updateRawMaterialSupplier(supplier: SupplierModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${supplier.id}`, supplier);
  }
}
