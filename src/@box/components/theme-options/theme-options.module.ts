import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { BoxDirectivesModule } from '@box/directives/directives';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { BoxMaterialColorPickerModule } from '@box/components/material-color-picker/material-color-picker.module';

import { BoxThemeOptionsComponent } from '@box/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        BoxThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        BoxDirectivesModule,
        BoxMaterialColorPickerModule,
        BoxSidebarModule
    ],
    exports     : [
        BoxThemeOptionsComponent
    ]
})
export class BoxThemeOptionsModule
{
}
