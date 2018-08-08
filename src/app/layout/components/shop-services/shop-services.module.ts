import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { ShopServicesComponent } from 'app/layout/components/shop-services/shop-services.component';

@NgModule({
    declarations: [
        ShopServicesComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        BoxSharedModule
    ],
    exports     : [
        ShopServicesComponent
    ]
})
export class ShopServicesModule
{
}
