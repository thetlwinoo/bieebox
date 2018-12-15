import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule, MatCardModule } from '@angular/material';
import { CarouselComponent } from './carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        MatCardModule,
        NguCarouselModule
    ],
    exports: [
        CarouselComponent
    ]
})
export class CarouselModule {
}
