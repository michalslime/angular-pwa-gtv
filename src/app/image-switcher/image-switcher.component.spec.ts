import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageService } from '../image.service';
import { Observable, Subscription, of } from 'rxjs';
import { ImageSwitcherComponent } from './image-switcher.component';

describe('ImageFetcherComponent', () => {
    let component: ImageSwitcherComponent;
    let fixture: ComponentFixture<ImageSwitcherComponent>;
    let mockImageService: { getImageUrl: { and: { returnValue: (arg0: Observable<{ url: string; }>) => void; }; }; };
    let mockResponse = { url: 'https://example.com/image.jpg' };

    beforeEach(async () => {
        // Mock ImageService
        mockImageService = jasmine.createSpyObj(['getImageUrl']);

        await TestBed.configureTestingModule({
            declarations: [ImageSwitcherComponent],
            // Provide the mock instead of the actual service
            providers: [
                { provide: ImageService, useValue: mockImageService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageSwitcherComponent);
        component = fixture.componentInstance;
        // Mock the service call
        mockImageService.getImageUrl.and.returnValue(of(mockResponse));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe on destroy', () => {
        const fetchSubscription = component['fetchSubscription'] as Subscription;

        spyOn(fetchSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(fetchSubscription.unsubscribe).toHaveBeenCalled();
    });
});
