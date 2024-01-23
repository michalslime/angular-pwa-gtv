import { Component, OnInit } from '@angular/core';
import { NbpService, Currency } from '../services/nbp.service';

@Component({
    selector: 'app-currency-converter',
    template: `
    <div>
      <input type="number" [(ngModel)]="amount" placeholder="Enter amount">
      <select [(ngModel)]="selectedCurrency" (ngModelChange)="onCurrencySelect()">
        <option *ngFor="let currency of currencies" [value]="currency.code">
          {{ currency.code }}
        </option>
      </select>
      <div *ngIf="exchangeRate === null">There is no exchange rate for today yet, or today is bank holiday</div>
      <div *ngIf="exchangeRate !== null">Exchange Rate: {{ exchangeRate }}</div>
      <div *ngIf="calculatedValue !== null">Result: {{ calculatedValue }}</div>
    </div>
  `
})
export class CurrencyConverterComponent implements OnInit {
    amount: number = 0;
    selectedCurrency: string = '';
    exchangeRate!: number | null;
    calculatedValue: number | null = null;
    currencies: Currency[] = [];

    constructor(private NbpService: NbpService) { }

    ngOnInit() {
        this.NbpService.getCurrencies().subscribe(data => {
            this.currencies = data;
        });
    }

    onCurrencySelect() {
        if (this.selectedCurrency) {
            const today = new Date().toISOString().split('T')[0];
            this.NbpService.getExchangeRate(this.selectedCurrency, today)
                .subscribe((rate: number | null) => {
                    this.exchangeRate = rate;
                    if (this.exchangeRate) {
                        this.calculatedValue = this.amount * this.exchangeRate;
                    } else {
                        this.calculatedValue = 0;
                    }
                });
        }
    }
}
