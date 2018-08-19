import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlModule } from 'ngx-owl-carousel';
// import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ImageZoomModule } from 'angular2-image-zoom';
import { ShopService } from './shop.service';
import { ShopSelectedService } from './shop-selected.service';
import { PhotoService } from '@store/services/photo.service';
import { BrandModule } from '@box/components/brand/brand.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { BoxDemoModule } from '@box/components/demo/demo.module';
import { StockItemsModule } from '@store/stock-items/stock-items.module';
import { MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSliderModule, MatCheckboxModule, MatChipsModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';
import { ProductCardModule } from '@box/components/product-card/product-card.module';
import { BoxTreeViewModule } from '@box/components/tree-view/tree-view.module';
import { ControllerComponent } from './view-products-page/controller/controller.component';
import { PagingComponent } from './view-products-page/paging/paging.component';
import { RelatedProductsComponent } from './selected-product-page/related-products/related-products.component';
import { SelectedProductComponent } from './selected-product-page/selected-product/selected-product.component';
import { ProductDetailComponent } from './selected-product-page/product-detail/product-detail.component';
import { StockItemExistsGuard } from '@store/stock-items/guards/stock-item-exists.guard';
import { ProductListComponent } from './view-products-page/product-list/product-list.component';
import { ViewProductsPageComponent } from './view-products-page/view-products-page.component';
import { SelectedProductPageComponent } from './selected-product-page/selected-product-page.component';

const routes = [
  {
    path: 'shop',
    component: ViewProductsPageComponent,
    resolve: {
      data: ShopService
    },
    data: {
      breadcrumbs: 'Home / Shop'
    }
  },
  {
    path: 'shop/:id',
    component: SelectedProductPageComponent,
    resolve: {
      data: ShopSelectedService
    },
    data: {
      breadcrumbs: 'Home / Shop / Detail'
    },
    canActivate: [StockItemExistsGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxImageZoomModule.forRoot(),
    ImageZoomModule,
    CommonModule,
    OwlModule,
    SlickCarouselModule,
    BoxSidebarModule,
    BrandModule,
    BoxDemoModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    ProductCardModule,
    BoxTreeViewModule,
    BoxSharedModule,
    StockItemsModule
  ],
  declarations: [
    ShopComponent,
    ControllerComponent,
    PagingComponent,
    RelatedProductsComponent,
    SelectedProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    ViewProductsPageComponent,
    SelectedProductPageComponent,
  ],
  providers: [
    ShopService,
    PhotoService,
    ShopSelectedService
  ]
})
export class ShopModule { }
