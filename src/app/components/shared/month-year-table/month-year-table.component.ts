import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-month-year-table',
  templateUrl: './month-year-table.component.html'
})
export class MonthYearTableComponent implements OnInit {
  @Input() mData: any;
  @Input() typeTable: string;
  @Input() lenRT: number;

  constructor() {}

  ngOnInit() {
  }

  getNumber(number: string): number{
    return +number;
  }

}
