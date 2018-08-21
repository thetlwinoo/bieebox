import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { ProductCardComponent } from './product-card.component';
import { ProductCardDirective } from './product-card.directive';
import { BoxPipesModule } from '@box/pipes/pipes.module';
// import { ShoppingCartService } from "@box/services/cart.service";
// import { StorageService, LocalStorageService } from "@box/services/storage.service";
import { CheckoutModule } from '@store/checkout/checkout.module';

import { ShoppingCartModule } from 'ng-shopping-cart';

@NgModule({
    declarations: [
        ProductCardComponent,
        ProductCardDirective
    ],
    imports: [
        CommonModule,
        CheckoutModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        BoxPipesModule,
        ShoppingCartModule.forChild()        
    ],
    exports: [
        ProductCardComponent,
        ProductCardDirective
    ]
})
export class ProductCardModule {
}
