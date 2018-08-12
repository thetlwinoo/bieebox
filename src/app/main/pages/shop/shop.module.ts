import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopService } from './shop.service';
import { BrandModule } from '@box/components/brand/brand.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { BoxDemoModule } from '@box/components/demo/demo.module';
import { MatListModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';

const routes = [
  {
    path: 'shop',
    component: ShopComponent,
    resolve: {
      data: ShopService
    },
    data: {      
      breadcrumbs: 'Home / Shop'
    }
  },
  {
    path: 'shop/:id',
    component: ShopDetailComponent,
    data: {
      breadcrumbs: 'Home / Shop / Detail'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),    
    NgxImageZoomModule.forRoot(),
    CommonModule,
    OwlModule,
    SlickCarouselModule,
    BoxSidebarModule,
    BrandModule,
    BoxDemoModule,
    MatListModule, 
    MatIconModule, 
    MatButtonModule,
    BoxSharedModule
  ],
  declarations: [ShopComponent, ShopDetailComponent, ShopListComponent],
  providers:[
    ShopService
  ]
})
export class ShopModule { }
