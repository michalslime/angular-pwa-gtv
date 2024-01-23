import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NbpService } from './nbp.service';

describe('NbpService', () => {
    let service: NbpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NbpService]
        });

        service = TestBed.inject(NbpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve exchange rate', () => {
        const mockExchangeRate = {
            rates: [{ mid: 4.0289 }]
        };
        const code = 'USD';
        const date = '2024-01-02';

        service.getExchangeRate(code, date).subscribe(rate => {
            expect(rate).toEqual(4.0289);
        });

        const req = httpTestingController.expectOne(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/${date}/?format=json`);
        expect(req.request.method).toBe('GET');
        req.flush(mockExchangeRate);
    });
});
