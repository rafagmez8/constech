import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-real-time-measure',
  templateUrl: './real-time-measure.component.html',
  styles: []
})
export class RealTimeMeasureComponent implements OnInit {
  allData: any;
  len: any;
  loading: boolean;

  constructor(private databaseService: DatabaseService) {
    this.loading = true;
    this.getRealTimeData();
  }

  ngOnInit() {}

  getRealTimeData() {
    this.databaseService.getAllData().subscribe(response => {
      this.allData = response;
      this.len = this.allData.length-1;
      this.loading = false;
      console.log('-- allData: --');
      console.log(response);
      console.log(response[this.allData.length-1]);

    });
  }

  getNumber(number: string): number{
    return +number;
  }

  refresh() {
    window.location.reload();
  }

}
