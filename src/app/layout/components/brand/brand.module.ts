import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';
import { OwlModule } from 'ngx-owl-carousel';
import { BrandComponent } from './brand.component';

@NgModule({
    declarations: [
        BrandComponent
    ],
    imports     : [
        RouterModule,
        OwlModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        BoxSharedModule
    ],
    exports     : [
        BrandComponent
    ]
})
export class BrandModule
{
}
