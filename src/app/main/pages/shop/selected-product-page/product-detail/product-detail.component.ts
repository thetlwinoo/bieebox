import { Component, OnInit, Input } from '@angular/core';
import { StockItem } from '@box/models';
import { carousel } from '@box/carousel';
import { PhotoService } from '@store/services/photo.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: any;
  @Input() relatedItems: any;
  @Input() images: any;
  @Input() selectedId: String;
  carousel: any;
  selectedGalleryImage: any;

  // get defaultImage(){
  //   console.log(this.images)
  //   return this.images[0];
  // }
  constructor(
    private photoService: PhotoService
  ) {
    this.carousel = carousel;
    console.log(this.carousel)
    // console.log(this.images)
    this.photoService.onImagesChanged.subscribe(images => {
      this.selectedGalleryImage = images[0];
    })
  }

  ngOnInit() {
    console.log('YYYYYYY', this.selectedId)
  }

  onSelectGalleryImage(event) {
    console.log(event)
    this.selectedGalleryImage = event;
  }
}
