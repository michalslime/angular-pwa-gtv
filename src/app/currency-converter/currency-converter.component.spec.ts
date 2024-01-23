import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConverterComponent } from './currency-converter.component';
import { FormsModule } from '@angular/forms';
import { NbpService } from '../services/nbp.service';
import { of } from 'rxjs';

describe('CurrencyConverterComponent', () => {
    let component: CurrencyConverterComponent;
    let fixture: ComponentFixture<CurrencyConverterComponent>;
    let nbpService: NbpService;

    beforeEach(async () => {
        const nbpServiceMock = {
            getCurrencies: () => of([{ code: 'USD' }, { code: 'EUR' }]),
            getExchangeRate: () => of(2)
        };

        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CurrencyConverterComponent],
            providers: [{ provide: NbpService, useValue: nbpServiceMock }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrencyConverterComponent);
        component = fixture.componentInstance;
        nbpService = TestBed.inject(NbpService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate currencies on init', () => {
        component.ngOnInit();
        expect(component.currencies.length).toBeGreaterThan(0);
    });

    it('should call getExchangeRate and calculate result when a currency is selected', () => {
        const exchangeRateSpy = spyOn(nbpService, 'getExchangeRate').and.returnValue(of(2));

        component.selectedCurrency = 'USD';
        component.onCurrencySelect();

        expect(exchangeRateSpy).toHaveBeenCalledWith('USD', jasmine.any(String));
        expect(component.exchangeRate).toBe(2);
    });
});
