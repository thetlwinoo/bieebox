import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import { BrandModule } from '@box/components/brand/brand.module';
import { MatGridListModule, MatTabsModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';

import { StockItemsModule } from '@store/stock-items/stock-items.module';
import { HomeComponent } from './home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderBannerComponent } from './slider-banner/slider-banner.component';

import { HomeService } from './home.service';
import { HomeProductComponent } from './home-product/home-product.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      data: HomeService
    }
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    SliderBannerComponent,
    HomeProductComponent,
    BestSellingComponent,
    TopSellingComponent,
    ProductCategoryComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    OwlModule,
    BrandModule,
    StockItemsModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SlickCarouselModule,
    BoxSharedModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
