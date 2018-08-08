import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule, MatListModule } from '@angular/material';

import { BoxDemoContentComponent } from './demo-content/demo-content.component';
import { BoxDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        BoxDemoContentComponent,
        BoxDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        BoxDemoContentComponent,
        BoxDemoSidebarComponent
    ]
})
export class BoxDemoModule
{
}
