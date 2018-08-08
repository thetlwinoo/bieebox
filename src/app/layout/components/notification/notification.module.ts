import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

import { BoxSearchBarModule, BoxShortcutsModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';

import { NotificationComponent } from 'app/layout/components/notification/notification.component';

@NgModule({
    declarations: [
        NotificationComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,

        BoxSharedModule,
        BoxSearchBarModule,
        BoxShortcutsModule
    ],
    exports     : [
        NotificationComponent
    ]
})
export class NotificationModule
{
}
