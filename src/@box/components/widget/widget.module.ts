import { NgModule } from '@angular/core';

import { BoxWidgetComponent } from './widget.component';
import { BoxWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        BoxWidgetComponent,
        BoxWidgetToggleDirective
    ],
    exports     : [
        BoxWidgetComponent,
        BoxWidgetToggleDirective
    ],
})
export class BoxWidgetModule
{
}
