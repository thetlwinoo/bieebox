import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { NewsletterComponent } from 'app/layout/components/newsletter/newsletter.component';

@NgModule({
    declarations: [
        NewsletterComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        BoxSharedModule
    ],
    exports     : [
        NewsletterComponent
    ]
})
export class NewsletterModule
{
}
