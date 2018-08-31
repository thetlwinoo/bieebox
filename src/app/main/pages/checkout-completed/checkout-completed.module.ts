import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCheckboxModule, MatDividerModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatDialogModule, MatInputModule, MatRadioModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';
import { CheckoutCompletedComponent } from './checkout-completed.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { CheckoutCompletedService } from './checkout-completed.service';
import { OwlModule } from 'ngx-owl-carousel';
import { ProductCardModule } from '@box/components/product-card/product-card.module';

const routes = [
    {
        path: 'checkout-completed',
        component: CheckoutCompletedComponent,
        resolve: {
            data: CheckoutCompletedService
        }
    }
];

@NgModule({
    declarations: [
        CheckoutCompletedComponent,
        RelatedProductsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        BoxSharedModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        // MatExpansionModule,
        // MatFormFieldModule,
        // MatDatepickerModule,
        // MatInputModule,
        MatButtonModule,
        // MatDialogModule,
        // MatCheckboxModule,
        // MatRadioModule
        OwlModule,
        ProductCardModule
    ],
    providers: [
        CheckoutCompletedService
    ],
    entryComponents: []
})
export class CheckoutCompletedModule { }
