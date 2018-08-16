import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule, MatBadgeModule, MatProgressSpinnerModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { HeaderComponent } from 'app/layout/components/header/header.component';
import { SearchComponent } from './search/search.component';

import { KeywordsModule } from '@store/keywords/keywords.module';
import { HeaderService } from './header.service';

@NgModule({
    declarations: [
        HeaderComponent,
        SearchComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        BoxSharedModule,
        KeywordsModule
    ],
    exports: [
        HeaderComponent
    ],
    providers:[
        HeaderService
    ]
})
export class HeaderModule {
}
