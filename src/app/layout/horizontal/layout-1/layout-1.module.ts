import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

import { BoxSidebarModule, BoxThemeOptionsModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { HeaderModule } from 'app/layout/components/header/header.module';
import { BrandModule } from 'app/layout/components/brand/brand.module';
import { ShopServicesModule } from 'app/layout/components/shop-services/shop-services.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NewsletterModule } from 'app/layout/components/newsletter/newsletter.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
import { NotificationModule } from 'app/layout/components/notification/notification.module';

import { HorizontalLayout1Component } from 'app/layout/horizontal/layout-1/layout-1.component';

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

@NgModule({
    declarations: [
        HorizontalLayout1Component
    ],
    imports     : [
        McBreadcrumbsModule.forRoot(),
        MatSidenavModule,

        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,
        NotificationModule,
        
        ContentModule,
        HeaderModule,
        BrandModule,
        ShopServicesModule,
        FooterModule,
        NewsletterModule,        
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        HorizontalLayout1Component
    ]
})
export class HorizontalLayout1Module
{
}
