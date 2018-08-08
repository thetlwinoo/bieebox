import { NgModule } from '@angular/core';

import { BoxCountdownComponent } from '@box/components/countdown/countdown.component';

@NgModule({
    declarations: [
        BoxCountdownComponent
    ],
    exports: [
        BoxCountdownComponent
    ],
})
export class BoxCountdownModule
{
}
