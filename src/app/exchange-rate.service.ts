import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ExchangeRate } from './exchange-rate';
@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getExchangeRate() {
    return this.http.get(
      'https://v6.exchangerate-api.com/v6/ff99d432892ead0af2a70553/latest/INR'
      ).pipe(
        map((data: ExchangeRate) => {
          return data;
        }), catchError( error => {
          return throwError( 'Something went wrong!' );
        })
     )
  }
}
