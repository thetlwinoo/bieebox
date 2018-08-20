import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '../../../modules/store';
import { EffectsModule } from '../../../modules/effects';
import { CartEffects } from './effects/cart';
// import { AddressEffects } from './effects/address.effects';
import { reducers } from './reducers';
// import { AuthGuard } from '../auth/services/auth-guard.service';
import { CartGuard } from './guards/cart.guard';
// import { DefaultPipe } from './pipes/default.pipe';

// import { AddressService } from './services/address.service';
// import { OrderEffects } from 'app/checkout/effects/order.effects';
// import { OrderService } from 'app/checkout/services/order.service';
import { ShoppingCartService } from '@box/services/cart.service';
import { StorageService, LocalStorageService } from '@box/services/storage.service';
import { DeliveryService } from '@box/services/delivery.service';
@NgModule({
    imports: [
        CommonModule,
    ],
    //   declarations: [DefaultPipe],
    //   exports:[DefaultPipe] 
})
export class CheckoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootCheckoutModule,
            providers: [
                CartGuard,
                { provide: StorageService, useClass: LocalStorageService },
                {
                    deps: [StorageService],
                    provide: ShoppingCartService,
                    useClass: ShoppingCartService
                },
                DeliveryService
            ],
        };
    }
}
@NgModule({
    imports: [
        CheckoutModule,
        StoreModule.forFeature('checkout', reducers),
        EffectsModule.forFeature([
            CartEffects,
            // AddressEffects,
            // OrderEffects
        ]),
    ],
    providers: [
        // AddressService,
        // OrderService
    ]
})
export class RootCheckoutModule { }
