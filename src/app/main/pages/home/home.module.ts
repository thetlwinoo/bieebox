import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
// import { BrandModule } from '@box/components/brand/brand.module';
import { BoxCountdownModule } from '@box/components/countdown/countdown.module';
import { MatGridListModule, MatTabsModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { StockItemsModule } from '@store/stock-items/stock-items.module';
import { HomeComponent } from './home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderBannerComponent } from './slider-banner/slider-banner.component';
import { ProductCardModule } from '@box/components/product-card/product-card.module';
import { HomeService } from './home.service';
import { HomeProductComponent } from './home-product/home-product.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { DailyDiscoverComponent } from './daily-discover/daily-discover.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { FlashDealsComponent } from './flash-deals/flash-deals.component';
import { BrandZoneComponent } from './brand-zone/brand-zone.component';
import { CarouselModule } from '@box/components/carousel/carousel.module';
// import { ToastyModule } from "ng2-toasty";

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
    DailyDiscoverComponent,
    PopularProductsComponent,
    FlashDealsComponent,
    BrandZoneComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    OwlModule,
    // BrandModule,
    ProductCardModule,
    StockItemsModule,
    BoxCountdownModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SlickCarouselModule,
    BoxSharedModule,
    CarouselModule
    // ToastyModule.forRoot(),
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
