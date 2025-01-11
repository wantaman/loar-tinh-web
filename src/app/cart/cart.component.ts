import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AllApiService } from '../core/all-api.service';
import { GeneralFunctionService } from '../core/function/general-function.service';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  search_key: any;
  searchTimeout: any;
  loadingGet = false;
  loadingRequest = false;
  isRefreshTable = false;
  resultData:any;
  totalPrice: any;

  constructor(
    private allFunction: GeneralFunctionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public dialogRef: MatDialogRef<CartComponent>,
    private allApi: AllApiService,
    private router: Router,
  )
  {
    this.getAllData()
  }

  onSearch() {
    this.clearSearch();
    this.loadingGet = true;
    this.searchTimeout = setTimeout(() => {
      this.searchTimeout = null;
      this.getAllData()
    }, this.allFunction.searchDelay);
  }

  clearSearch() {
    if (this.searchTimeout) {
      this.loadingGet = false;
      clearTimeout(this.searchTimeout)
      this.searchTimeout = null;
    }
  }

  getAllData(){
    this.loadingGet = true;
    let filter = {
      keyword: this.search_key
    }

    this.allApi.getDataWithFilter(this.allApi.cartUrl, filter).subscribe(
      (data: any) =>{
        this.loadingGet = false;
        this.resultData = data.data;
        this.calculateTotalPrice();
        console.log('data cart', data)
      },
      (err:any) =>{
        this.loadingGet = false;
        console.log('Error', err)
      }
    )
  }

  orderProduct(){
    const inputData = {
      "userId": 1,
      "items": [
          {
              "productId": 1,
              "quantity": 9
          }
      ],
    }

    this.allApi.createData(this.allApi.orderUrl, inputData).subscribe(
      (data:any) =>{
        console.log('data order success', data)
 
      }
    )
  }
  calculateTotalPrice() {
    let total = 0;
    this.resultData.forEach((item: any) => {
      total += item.product.unitPrice * item.quantity;
    });
    this.totalPrice = total;
  }

  gotoPage(product: any) {
    console.log(product);
    this.router.navigate(
      ['detail-product'],
      {
        queryParams: { product_id: product },
      },
    );
    this.closeForm();
  }


  closeForm() {
    this.allFunction.closeDialog(this.dataDetail.form_name)
    setTimeout(() => {
      this.dialogRef.close(
        { is_refresh: this.isRefreshTable }
      );
    }, this.allFunction.closeDelaySmall);
  }
}
