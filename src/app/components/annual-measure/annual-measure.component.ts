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

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.getYearData();
  }

  ngOnInit() {
  }

  getYearData() {
    this.databaseService.getYearData().subscribe(response => {
      this.yearData = response;
      this.loading = false;
      console.log("-- yearData: --");
      console.log(response);
    });
  }

}
