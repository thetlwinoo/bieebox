import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';
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
        BoxPipesModule
    ],   
    exports: [
        ProductCardComponent,
        ProductCardDirective
    ],
})
export class ProductCardModule {
}
