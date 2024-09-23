import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from './model/raw-material.model';
import { map, Observable } from 'rxjs';
import { SupplierModel } from '../suppliers/model/supplier.model';
import { ApiResponse } from '../../util/api.response';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {


  private apiUrl = 'http://localhost:8080/api/rawmaterial';
  private suppliersUrl = 'http://localhost:8080/api/supplier';

  constructor(private http: HttpClient) { }

  getAllRawMaterials(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  saveRawMaterial(rawMaterial: RawMaterial, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('rawMaterial', new Blob([JSON.stringify(rawMaterial)], {type: 'application/json'}));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, formData);
  }

  updateRawMaterial(rawMaterial: RawMaterial, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('rawMaterial', new Blob([JSON.stringify(rawMaterial)], {type: 'application/json'}));
    
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, formData);
  }

  deleteRawMaterialById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  findRawMaterialById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  findRawMaterialsBySupplierId(supplierId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('supplierId', supplierId);
    return this.http.get<ApiResponse>(`${this.apiUrl}/search`, { params });
  }


}
