import { Injectable } from '@angular/core';
import {ApiResponse} from "../../util/api.response";
import {HttpClient} from "@angular/common/http";
import {Procurement} from "./model/procurement.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {
  private apiUrl = 'http://localhost:8080/api/procurement';

  constructor(private http: HttpClient) {}

  saveProcurement(procurement: Procurement): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, procurement);
  }

  getAllProcurements(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  getProcurementById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  deleteProcurementById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
