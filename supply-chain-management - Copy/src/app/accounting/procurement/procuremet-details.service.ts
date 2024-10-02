import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response";

@Injectable({
  providedIn: 'root'
})
export class ProcurementDetailsService {
  private apiUrl = 'http://localhost:8080/api/procurementdetails';

  constructor(private http: HttpClient) {}


  // getAllSalesDetails(): Observable<SalesDetails> {
  //   return this.http.get<SalesDetails>(`${this.apiUrl}/list`);
  // }
  getAllProcurementDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  getProcurementDetailsGrouped(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/grouped`);
  }
}
