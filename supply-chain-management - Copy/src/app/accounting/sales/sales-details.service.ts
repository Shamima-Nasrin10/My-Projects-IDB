import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../util/api.response";

@Injectable({
  providedIn: 'root'
})
export class SalesDetailsService {

  private apiUrl = 'http://localhost:8080/api/salesdetails';

  constructor(private http: HttpClient) {}


  getAllSalesDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  getSalesDetailsGrouped(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/grouped`);
  }

  // searchByCustomerNameAndId(sales: SalesDetails[], searchTerm: string): SalesDetails[] {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //
  //   return sales.filter(item =>
  //     (item.sale.customername?.toLowerCase().includes(lowerCaseSearchTerm) ||
  //       item.sale.id?.toString().includes(lowerCaseSearchTerm)
  //     )
  //   );
  // }


}