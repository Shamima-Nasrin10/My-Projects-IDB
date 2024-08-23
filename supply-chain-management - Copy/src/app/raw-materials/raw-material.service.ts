import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from './model/raw-material.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {


  private apiUrl = 'http://localhost:3000/rawMaterials';

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

}
