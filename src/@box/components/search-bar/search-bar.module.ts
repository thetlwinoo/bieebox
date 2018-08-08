import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { BoxSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        BoxSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        BoxSearchBarComponent
    ]
})
export class BoxSearchBarModule
{
}
