import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Currency {
    code: string;
}

@Injectable({
    providedIn: 'root'
})
export class NbpService {
    private baseUrl = 'https://api.nbp.pl/api/exchangerates';

    constructor(private http: HttpClient) { }

    public getCurrencies(): Observable<Currency[]> {
        const url = `${this.baseUrl}/tables/A/?format=json`
        return this.http.get<any[]>(url).pipe(
            map(response => response[0].rates.map((data: { code: any; }) => ({ code: data.code })))
        );
    }

    public getExchangeRate(code: string, date: string): Observable<any> {
        const url = `${this.baseUrl}/rates/A/${code}/${date}/?format=json`;
        return this.http.get<any>(url).pipe(
            map(response => {
                return response.rates && response.rates.length > 0 ? response.rates[0].mid : null;
            }), 
            catchError((error: HttpErrorResponse) => {

              console.error('Error fetching exchange rate:', error);
              return of(null);
            })
          );
    }
}
