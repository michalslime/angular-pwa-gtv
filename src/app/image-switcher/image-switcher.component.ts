import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-image-fetcher',
    template: `<img *ngIf="imageUrl" [src]="imageUrl" alt="Random Image">`
})
export class ImageSwitcherComponent implements OnInit, OnDestroy {
    imageUrl!: string;
    private fetchSubscription!: Subscription;

    constructor(private imageService: ImageService) { }

    ngOnInit() {
        this.fetchSubscription = interval(30000)
            .pipe(
                switchMap(() => this.imageService.getImageUrl())
            )
            .subscribe(data => {
                this.imageUrl = data;
            });
    }

    ngOnDestroy() {
        if (this.fetchSubscription) {
            this.fetchSubscription.unsubscribe();
        }
    }
}
