import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { BoxModule } from '@box/box.module';
import { BoxSharedModule } from '@box/shared.module';
import { BoxSidebarModule, BoxThemeOptionsModule } from '@box/components';

import { boxConfig } from 'app/box-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { environment } from '../environments/environment';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from 'app/fake-db/fake-db.service';
//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SnackBarService } from '@box/services/snackbar.service';
import { reducers, metaReducers } from './reducers';
import { BoxInMemoryService } from '@box/services/in-memory.service';

import { ShoppingCartModule } from 'ng-shopping-cart';

const appRoutes: Routes = [
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: '**',
        redirectTo: 'pages/home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,          
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
        StoreDevtoolsModule.instrument({
            name: 'NgRx Products Store DevTools',
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),    
        ShoppingCartModule.forRoot({
            serviceType: 'localStorage',
            serviceOptions: {
                storageKey: 'BieeBoxCart',
                clearOnError: true
            }
        }),           
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        // Box modules
        BoxModule.forRoot(boxConfig),
        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,        
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        SnackBarService,
        BoxInMemoryService
    ]
})
export class AppModule {
}
