import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageSwitcherComponent } from './image-switcher/image-switcher.component';

const routes: Routes = [
    { path: 'image-switcher', component: ImageSwitcherComponent }
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
