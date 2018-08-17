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
import { MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSliderModule, MatCheckboxModule, MatChipsModule } from '@angular/material';
import { BoxSharedModule } from '@box/shared.module';
import { ProductCardModule } from '@box/components/product-card/product-card.module';
import { BoxTreeViewModule } from '@box/components/tree-view/tree-view.module';
import { ControllerComponent } from './controller/controller.component';
import { PagingComponent } from './paging/paging.component';
import { RelatedProductsComponent } from './shop-detail/related-products/related-products.component';
import { SelectedProductComponent } from './shop-detail/selected-product/selected-product.component';
import { ProductDetailComponent } from './shop-detail/product-detail/product-detail.component';

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
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    ProductCardModule,
    BoxTreeViewModule,
    BoxSharedModule
  ],
  declarations: [
    ShopComponent,
    ShopDetailComponent,
    ShopListComponent,
    ControllerComponent,
    PagingComponent,
    RelatedProductsComponent,
    SelectedProductComponent,
    ProductDetailComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
