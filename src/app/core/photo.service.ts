import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  getImages(): Promise<any[]> {
    return Promise.resolve([
      {
        itemImageSrc: 'assets/images/slider1.webp',
        thumbnailImageSrc: 'assets/images/slider1.webp'
      },
      {
        itemImageSrc: 'assets/images/slider2.webp',
        thumbnailImageSrc: 'assets/images/slider2.webp'
      },
      {
        itemImageSrc: 'assets/images/slider3.webp',
        thumbnailImageSrc: 'assets/images/slider3.webp'
      }
    ]);
  }
}
