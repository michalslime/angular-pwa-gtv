import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageSwitcherComponent } from './image-switcher/image-switcher.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

const routes: Routes = [
    { path: 'image-switcher', component: ImageSwitcherComponent },
    { path: 'currency-converter', component: CurrencyConverterComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}
