import {Component, OnInit} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {SalesDetails} from "../model/salesdetails.model";
import {SalesDetailsService} from "../sales-details.service";
import {ApiResponse} from "../../../util/api.response";

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrl: './sales-details.component.css'
})
export class SalesDetailsComponent implements OnInit{

  salesDetails: SalesDetails[] = [];
  groupedSalesDetails: Record<number, SalesDetails[]> = {};

  constructor(private salesDetailsService: SalesDetailsService) {}

  ngOnInit(): void {
    this.loadSalesDetails();
    this.loadGroupedSalesDetails();
  }

  public loadSalesDetails(): void {
    this.salesDetailsService.getAllSalesDetails().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.salesDetails = response.data['salesDetails'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadGroupedSalesDetails(): void {
    this.salesDetailsService.getSalesDetailsGrouped().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.groupedSalesDetails = response.data['groupedSalesDetails'] as Record<number, SalesDetails[]>;
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

}
