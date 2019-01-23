import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-daily-measure',
  templateUrl: './daily-measure.component.html',
  styles: []
})
export class DailyMeasureComponent implements OnInit {
  daysData: any;
  num: number;
  loading: boolean;
  typeTableD: string = "day";
  error: boolean;
  errorMessage: string;

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.error = false;
    this.getDaysData();
  }

  ngOnInit() {}

  getDaysData() {
    this.databaseService.getDaysData().subscribe(
      (response: any) => {
        this.daysData = response;
        this.loading = false;
        console.log('-- daysData: --');
        console.log(response);
      },
      (serviceError) => {
        this.errorMessage = serviceError.error.error.message;
        this.error = true;
        this.loading = false;
    });
  }

  getNumber(number: string): number{
    return +number;
  }

}
