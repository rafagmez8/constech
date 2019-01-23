import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-annual-measure',
  templateUrl: './annual-measure.component.html',
  styles: []
})
export class AnnualMeasureComponent implements OnInit {
  yearData: any;
  loading: boolean;
  typeTableA: string = "annual";
  error: boolean;
  errorMessage: string;

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.error = false;
    this.getYearData();
  }

  ngOnInit() {}

  getYearData() {
    this.databaseService.getYearData().subscribe(
      (response: any) => {
        this.yearData = response;
        this.loading = false;
        console.log("-- yearData: --");
        console.log(response);
      },
      (serviceError) => {
        this.errorMessage = serviceError.error.error.message;
        this.error = true;
        this.loading = false;
      });
  }

}
