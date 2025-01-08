import { Component } from '@angular/core';
import { Product } from '../core/product';
import { AllApiService } from '../core/all-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  dataProduct:any[] = []
  images: string[] = [
    'assets/images/slider1.webp',
    'assets/images/slider2.webp',
    'assets/images/slider3.webp',
  ];

  responsiveOptions: any[] | undefined;

  constructor(private allApi: AllApiService) { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.getAllProduct()
  }

  getAllProduct(){
    this.allApi.getAllData(this.allApi.productUrl).subscribe(
      (data: any) =>{
        this.dataProduct = data['results']
        console.log('data respon', this.dataProduct)
      }
    )
  }
}
