import {Component, OnInit} from '@angular/core';
import {ApiResponse} from "../../../util/api.response";
import {NotifyUtil} from "../../../util/notify.util";
import {ProcurementDetails} from "../model/procurementdetails.model";
import {ProcurementDetailsService} from "../procuremet-details.service";

@Component({
  selector: 'app-procuremet-details',
  templateUrl: './procuremet-details.component.html',
  styleUrl: './procuremet-details.component.css'
})
export class ProcuremetDetailsComponent implements OnInit{

  procurementDetails: ProcurementDetails[]=[];
  groupedProcurementDetails: Map<number, ProcurementDetails[]> = new Map();


  constructor(private procurementDetailsService: ProcurementDetailsService) {}

  ngOnInit(): void {
    this.loadProcurementDetails();
    this.loadGroupedProcurementDetails();
  }

  public loadProcurementDetails(): void {
    this.procurementDetailsService.getAllProcurementDetails().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.procurementDetails = response.data['procurementDetails'];
          if (this.procurementDetails === null || this.procurementDetails.length === 0) {
            NotifyUtil.error('No procurement details found');
          }
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        console.error('Error loading sales details:', error);
        NotifyUtil.error(error);
      }
    });
  }


  // public loadSalesDetails(){
  //   this.salesDetailsService.getAllSalesDetails().subscribe({
  //     next:res=>{
  //       this.salesDetails=res;
  //       console.log(this.salesDetails+"*******************************");
  //     },
  //     error: err => {
  //       console.error('Error loading sales details:', err);
  //     }
  //
  //   });
  // }

  public loadGroupedProcurementDetails(): void {
    this.procurementDetailsService.getProcurementDetailsGrouped().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          // Convert Record<number, SalesDetails[]> to Map<number, SalesDetails[]>
          const groupedProcurementObject = response.data['groupedProcurementDetails'] as Record<number, ProcurementDetails[]>;
          this.groupedProcurementDetails = new Map<number, ProcurementDetails[]>(
            Object.entries(groupedProcurementObject).map(([key, value]) => [Number(key), value])
          );
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }


  protected readonly Object = Object;

}
