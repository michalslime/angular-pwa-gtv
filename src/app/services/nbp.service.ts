import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Currency {
    code: string;
}

@Injectable({
    providedIn: 'root'
})
export class NbpService {
    private apiUrl = 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json';

    constructor(private http: HttpClient) { }

    public getCurrencies(): Observable<Currency[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(response => response[0].rates.map((data: { code: any; }) => ({ code: data.code })))
        );
    }
}
