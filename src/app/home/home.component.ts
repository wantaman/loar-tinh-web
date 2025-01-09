import { Component, ElementRef, ViewChild } from '@angular/core';
import { AllApiService } from '../core/all-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  dataProduct: any[] = [];
  groupedProducts: any[] = [];
  loading: boolean = false;
  images: string[] = [
    'assets/images/slider1.webp',
    'assets/images/slider2.webp',
    'assets/images/slider3.webp',
  ];
  responsiveOptions: any[] | undefined;

  constructor(private allApi: AllApiService, private router: Router) { }

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

    this.getAllProduct();
    this.getCategoryProduct();
  }

  gotoPageViewMore(cate: any) {
    console.log(cate); 
    this.router.navigate(
      ['shop-more'],
      {
        queryParams: { category: cate },
      },
    );
  }

  gotoPage(product: any) {
    console.log(product); 
    this.router.navigate(
      ['detail-product'],
      {
        queryParams: { product_id: product },
      },
    );
  }

  getAllProduct() {
    this.loading = true;
    this.allApi.getAllData(this.allApi.productUrl).subscribe(
      (data: any) => {
        this.loading = false;
        this.dataProduct = data.data;
        this.groupProducts();
        console.log('data response', this.dataProduct);
      },
      (err: any) => {
        console.log('Error', err);
      }
    );
  }

  getCategoryProduct() {
    this.loading = true;
    this.allApi.getAllData(this.allApi.categoryUrl).subscribe(
      (data: any) => {
        this.loading = false;
        console.log('category data response', data);
      },
      (err: any) => {
        console.log('Error', err);
      }
    );
  }

  // Group products by categoryName
  groupProducts() {
    const grouped = this.dataProduct.reduce((acc, product) => {
      const category = product.categoryName;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          products: []
        };
      }
      acc[category].products.push(product);
      return acc;
    }, {});

    this.groupedProducts = Object.values(grouped);
  }
}
