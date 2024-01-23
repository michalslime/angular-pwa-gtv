import { Component, OnInit } from '@angular/core';
import { NbpService, Currency } from '../services/nbp.service';

@Component({
  selector: 'app-currency-converter',
  template: `
    <div>
      <input type="number" [(ngModel)]="amount" placeholder="Enter amount">
      <select [(ngModel)]="selectedCurrency"  (change)="onCurrencySelect($event)">
        <option *ngFor="let currency of currencies" [value]="currency">
          {{ currency.code }}
        </option>
      </select>
      <span *ngIf="calculatedValue !== null">Result: {{ calculatedValue }}</span>
    </div>
  `
})
export class CurrencyConverterComponent implements OnInit {
  amount: number = 0;
  selectedCurrency!: Currency;
  calculatedValue: number | null = null;
  currencies: Currency[] = [];

  constructor(private NbpService: NbpService) { }

  ngOnInit() {
    this.NbpService.getCurrencies().subscribe(data => {
      this.currencies = data;
    });
  }

  onCurrencySelect(e: any) {
    this.calculatedValue = this.amount * 2;
  }
}
