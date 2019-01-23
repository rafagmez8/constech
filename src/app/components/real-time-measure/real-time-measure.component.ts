import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-real-time-measure',
  templateUrl: './real-time-measure.component.html',
  styles: []
})
export class RealTimeMeasureComponent implements OnInit {
  allData: any;
  totalData: number;
  len: number;
  loading: boolean;
  typeTableRT: string = "realtime";
  limitedPower: any;
  limitReached: boolean;
  typeTableLP: string = "limitedpower";
  error: boolean;
  errorMessage: string;

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.error = false;
    this.getRealTimeData();
  }

  ngOnInit() {}

  getLimitedPower() {
    this.databaseService.getLimitedPower().subscribe(
      (response: any) => {
        this.limitedPower = response[0];
        console.log('-- limitedPower: --');
        console.log(response[0]);

        if (+this.totalData >= this.limitedPower.power) {
          this.limitReached = true;
        }

      },
      (serviceError) => {
        this.errorMessage = serviceError.error.error.message;
        this.error = true;
      });
  }

  getRealTimeData() {
    this.databaseService.getAllData().subscribe(
      (response: any) => {
        this.allData = response;
        this.len = this.allData.length-1;
        this.totalData = +response[this.len-1].total;
        this.loading = false;
        console.log('-- allData: --');
        console.log(response);
        console.log(response[this.len-1].total);

        this.databaseService.getLimitedPower().subscribe( response1 => {
          this.limitedPower = response1[0];
          console.log('-- limitedPower: --');
          console.log(response1[0]);

          if (this.totalData >= this.limitedPower.power) {
            this.limitReached = true;
            console.log(this.totalData + ">=" + this.limitedPower.power);
          }
        }
        );
      },
      (serviceError) => {
        this.errorMessage = serviceError.error.error.message;
        this.error = true;
        this.loading = false;
      });
  }

}
