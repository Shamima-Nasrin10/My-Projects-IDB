import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from './model/raw-material.model';
import { map, Observable } from 'rxjs';
import { SupplierModel } from '../suppliers/model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {


  private apiUrl = 'http://localhost:3000/rawMaterials';
  private suppliersUrl = 'http://localhost:3000/suppliers';

  constructor(private http: HttpClient) { }

  getRawMaterials(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(this.apiUrl);
  }

  getRawMaterial(id: number): Observable<RawMaterial> {
    return this.http.get<RawMaterial>(`${this.apiUrl}/${id}`);
  }

  addRawMaterial(rawMaterial: RawMaterial): Observable<RawMaterial> {
    return this.http.post<RawMaterial>(this.apiUrl, rawMaterial);
  }

  updateRawMaterial(id: number, rawMaterial: RawMaterial): Observable<RawMaterial> {
    return this.http.put<RawMaterial>(`${this.apiUrl}/${id}`, rawMaterial);
  }

  deleteRawMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.suppliersUrl);
  }

  getRawMaterialByName(name: string): Observable<RawMaterial | undefined> {
    return this.http.get<RawMaterial[]>(`${this.apiUrl}?name=${name}`).pipe(
      map(rawMaterials => rawMaterials.length > 0 ? rawMaterials[0] : undefined)
    );
  }

}
