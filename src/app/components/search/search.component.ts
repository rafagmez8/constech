import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  loading: boolean;
  resultAllData: any[] = [];
  resultDaysData: any[] = [];
  resultMonthData: any[] = [];
  resultYearData: any[] = [];
  seeAllDataContainer: boolean;
  seeDaysDataContainer: string;
  seeMonthDataContainer: string;
  seeYearDataContainer: string;
  typeTable: string = "realtime";
  text: string = "";

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
  }

  getResultsOfSearch(textSearch: string) {
    this.text = textSearch;
    this.databaseService.getAllData().subscribe(
      response1 => {
        let allData: any = response1;
        this.resultAllData = [];
        /*console.log(`textSearch: ${textSearch}`); console.log('response1:'); console.log(response1);*/
        for (let i=0; i < allData.length; i++) {
          let dat: string = response1[i].date.toLowerCase().replace("-", " ").replace("-", " ");

          if (dat.indexOf(textSearch) > -1 || // indexOf retornara -1 si no encuentra la cadena.
               allData[i].hour.indexOf(textSearch) > -1 ||
               allData[i].total.indexOf(textSearch) > -1 ||
               allData[i].total_money.toString().indexOf(textSearch) > -1 ||
               allData[i].fivev_sensor.indexOf(textSearch) > -1 ||
               allData[i].fivev_money.toString().indexOf(textSearch) > -1 ||
               allData[i].twentyv_sensor.indexOf(textSearch) > -1 ||
               allData[i].twentyv_money.toString().indexOf(textSearch) > -1) {
            this.resultAllData.push(allData[i]);
          }
        }

        this.seeAllDataContainer = true;
        console.log('resultAllData:'); console.log(this.resultAllData); console.log(this.resultAllData.length);
        if (textSearch === "" || this.resultAllData.length === 0) {
          this.seeAllDataContainer = false;
        }
      }
    );

    this.databaseService.getDaysData().subscribe(
      response2 => {
        let daysData: any = response2;
        this.resultDaysData = [];
        /*console.log(`textSearch: ${textSearch}`); console.log('response2:'); console.log(response2);*/
        for (let i=0; i < daysData.length; i++) {
          let dat: string = response2[i].date.toLowerCase().replace("-", " ").replace("-", " ");

          if (dat.indexOf(textSearch) > -1 || // indexOf retornara -1 si no encuentra la cadena.
               daysData[i].total.indexOf(textSearch) > -1 ||
               daysData[i].total_money.indexOf(textSearch) > -1) {
            this.resultDaysData.push(daysData[i]);
          }
        }

        this.seeDaysDataContainer = 'day';
        console.log('resultDaysData:'); console.log(this.resultDaysData); console.log(this.resultDaysData.length);
        if (textSearch === "" || this.resultDaysData.length === 0) {
          this.seeDaysDataContainer = 'false';
        }
      }
    );

    this.databaseService.getMonthData().subscribe(
      response3 => {
        let monthData: any = response3;
        this.resultMonthData = [];
        /*console.log(`textSearch: ${textSearch}`); console.log('response3:'); console.log(response3);*/
        for (let i=0; i < monthData.length; i++) {
          let dat: string = response3[i].date.toLowerCase().replace("-", " ").replace("-", " ");

          if (dat.indexOf(textSearch) > -1 || // indexOf retornara -1 si no encuentra la cadena.
               monthData[i].total.indexOf(textSearch) > -1 ||
               monthData[i].middle_value.indexOf(textSearch) > -1 ||
               monthData[i].total_money.indexOf(textSearch) > -1 ||
               monthData[i].middle_value_money.indexOf(textSearch) > -1) {
            this.resultMonthData.push(monthData[i]);
          }
        }

        this.seeMonthDataContainer = 'month';
        console.log('resultMonthData:'); console.log(this.resultMonthData); console.log(this.resultMonthData.length);
        if (textSearch === "" || this.resultMonthData.length === 0) {
          this.seeMonthDataContainer = 'false';
        }
      }
    );

    this.databaseService.getYearData().subscribe(
      response4 => {
        let yearData: any = response4;
        this.resultYearData = [];
        /*console.log(`textSearch: ${textSearch}`); console.log('response4:'); console.log(response4);*/
        for (let i=0; i < yearData.length; i++) {

          if (this.getFullYear(yearData[i].year).indexOf(textSearch) > -1 || // indexOf retornara -1 si no encuentra la cadena.
               yearData[i].total.indexOf(textSearch) > -1 ||
               yearData[i].middle_value.indexOf(textSearch) > -1 ||
               yearData[i].total_money.indexOf(textSearch) > -1 ||
               yearData[i].middle_value_money.indexOf(textSearch) > -1) {
            this.resultYearData.push(yearData[i]);
          }
        }

        this.seeYearDataContainer = 'annual';
        console.log('resultYearData:'); console.log(this.resultYearData); console.log(this.resultYearData.length);
        if (textSearch === "" || this.resultYearData.length === 0) {
          this.seeYearDataContainer = 'false';
        }
      }
    );
  }

  getNumber(number: string): number{
    return +number;
  }

  getFullYear(num: string) {
    if (num.length == 3) {
      return `2${num}`;
    }

    else if (num.length == 2) {
      return `20${num}`;
    }

    else if (num.length == 1) {
      return `200${num}`;
    }
  }

}
