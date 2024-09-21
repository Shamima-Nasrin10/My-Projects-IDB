import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from './model/raw-material.model';
import { map, Observable } from 'rxjs';
import { SupplierModel } from '../suppliers/model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {


  private apiUrl = 'http://localhost:8080/api/rawmaterial';
  private suppliersUrl = 'http://localhost:8080/api/supplier';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }),

  };

  constructor(private http: HttpClient) { }

  getAllRawMaterials(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.apiUrl}/list`);
  }

  saveRawMaterial(rawMaterial: RawMaterial, imageFile?: File | null): Observable<RawMaterial> {
    const formData = new FormData();
    formData.append('rawMaterial', new Blob([JSON.stringify(rawMaterial)], {type: 'application/json'}));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    console.log(rawMaterial)
    console.log(formData)
    return this.http.post<RawMaterial>(`${this.apiUrl}/save`, formData);
  }

  deleteRawMaterialById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  findRawMaterialById(id: number): Observable<RawMaterial> {
    return this.http.get<RawMaterial>(`${this.apiUrl}/${id}`);
  }

  updateRawMaterial(id: number, rawMaterial: RawMaterial, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('rawMaterial', JSON.stringify(rawMaterial));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, formData);
  }

  findRawMaterialsBySupplierName(supplierName: string): Observable<RawMaterial[]> {
    const params = new HttpParams().set('supplierName', supplierName);
    return this.http.get<RawMaterial[]>(`${this.apiUrl}/r/searchrawmaterial`, { params });
  }


}
