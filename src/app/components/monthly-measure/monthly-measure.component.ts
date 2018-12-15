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

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
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
      }
    );
  }


}
