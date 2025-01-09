import { Component, OnInit } from '@angular/core';
import { AllApiService } from '../core/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {
  dataProduct:any;
  Cate:any;
  loading: boolean = false;

  // constructor(
  //   private allApi: AllApiService,
  //   private router: Router
  // ){

  // }

  constructor(
    private allApi: AllApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.Cate = params['category'];

      console.log('Category:', this.Cate);
    });
  }


  ngOnInit() {
    this.getAllProduct();
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
    let filter = {
      filterCategory: this.Cate
    }
    this.allApi.getDataWithFilter(this.allApi.productUrl, filter).subscribe(
      (data: any) => {
        this.loading = false;
        this.dataProduct = data.data;
        console.log('data response', this.dataProduct);
      }
    );
  }
}
