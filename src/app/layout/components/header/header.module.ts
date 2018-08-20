import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule, MatBadgeModule, MatProgressSpinnerModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { HeaderComponent } from 'app/layout/components/header/header.component';
import { SearchComponent } from './search/search.component';

import { KeywordsModule } from '@store/keywords/keywords.module';
import { CheckoutModule } from '@store/checkout/checkout.module';
import { HeaderService } from './header.service';
// import { CartService } from '@box/services/cart.service';

@NgModule({
    declarations: [
        HeaderComponent,
        SearchComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        BoxSharedModule,
        KeywordsModule,
        CheckoutModule.forRoot()
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        HeaderService,
        // CartService
    ]
})
export class HeaderModule {
}
