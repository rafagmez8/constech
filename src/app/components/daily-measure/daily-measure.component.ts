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

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.getDaysData();
  }

  ngOnInit() {}

  getDaysData() {
    this.databaseService.getDaysData().subscribe(response => {
      this.daysData = response;
      this.loading = false;
      console.log('-- daysData: --');
      console.log(response);
    });
  }

  getNumber(number: string): number{
    return +number;
  }

}
