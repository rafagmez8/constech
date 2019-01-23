import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-monthly-measure',
  templateUrl: './monthly-measure.component.html',
  styles: []
})
export class MonthlyMeasureComponent implements OnInit {
  monthData: any;
  loading: boolean;
  typeTableM: string = "month";
  error: boolean;
  errorMessage: string;

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.error = false;
    this.getMonthData();
  }

  ngOnInit() {}

  getMonthData() {
    this.databaseService.getMonthData().subscribe(
      (response: any) => {
        this.monthData = response;
        this.loading = false;
        console.log("-- monthData: --");
        console.log(response);
      },
      (serviceError) => {
        this.errorMessage = serviceError.error.error.message;
        this.error = true;
        this.loading = false;
    });
  }


}
