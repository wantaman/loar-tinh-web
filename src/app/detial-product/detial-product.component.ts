import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../core/photo.service';

@Component({
  selector: 'app-detial-product',
  templateUrl: './detial-product.component.html',
  styleUrls: ['./detial-product.component.scss']
})
export class DetialProductComponent  {
  images: any[] = [
    {
      itemImageSrc: 'assets/images/slider1.webp',
      thumbnailImageSrc: 'assets/images/slider1.webp',
      alt: 'Description for Image 1'
    },
    {
      itemImageSrc: 'assets/images/slider2.webp',
      thumbnailImageSrc: 'assets/images/slider2.webp',
      alt: 'Description for Image 2'
    },
    {
      itemImageSrc: 'assets/images/slider3.webp',
      thumbnailImageSrc: 'assets/images/slider3.webp',
      alt: 'Description for Image 3'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
}
