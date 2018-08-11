import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatInputModule,  MatFormFieldModule, MatListModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { HeaderComponent } from 'app/layout/components/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        BoxSharedModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
