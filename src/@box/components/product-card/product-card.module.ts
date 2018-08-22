import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { ProductCardComponent } from './product-card.component';
import { ProductCardDirective } from './product-card.directive';
import { BoxPipesModule } from '@box/pipes/pipes.module';

@NgModule({
    declarations: [
        ProductCardComponent,
        ProductCardDirective
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        BoxPipesModule,
    ],
    exports: [
        ProductCardComponent,
        ProductCardDirective
    ]
})
export class ProductCardModule {
}
