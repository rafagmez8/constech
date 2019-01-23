import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AllDataInterface {
  date: String;
  hour: String;
  total: String;
  fivev_sensor: String;
  twentyv_sensor: String;
  total_money: Number;
  fivev_money: Number;
  twentyv_money: Number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {
    console.log("Database Service Ready!");
  }

  getAllData() {
    return this.http.get('all');
    //return this.getQuery('all');
    /*const headers = new HttpHeaders ({
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    });
    
    return this.http.get('http://localhost:8080/all', {headers});*/
  }

  getDaysData() {
    return this.http.get('days');
  }

  getMonthData() {
    return this.http.get('month');
  }

  getYearData() {
    return this.http.get('year');
  }

  getLimitedPower() {
    return this.http.get('limitpower');
  }
}
