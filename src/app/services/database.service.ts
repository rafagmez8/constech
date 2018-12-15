import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {
    console.log("Database Service Ready!");
  }

  getQuery(query: string) {
    const url = `http://localhost:3000/${query}`;

    const headers = new HttpHeaders ({
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    });

    return this.http.get(url, {headers});
  }

  getAllData() {
    return this.getQuery('all');
    /*const headers = new HttpHeaders ({
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    });

    return this.http.get('http://localhost:3000/all', {headers});*/
  }

  getDaysData() {
    return this.getQuery('days');
  }

  getMonthData() {
    return this.getQuery('month');
  }

  getYearData() {
    return this.getQuery('year');
  }

}
