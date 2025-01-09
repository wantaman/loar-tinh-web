import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralFunctionService } from '../core/function/general-function.service';
import { AllApiService } from '../core/all-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  search_key: any;
  searchTimeout: any;
  loadingGet = false;
  loadingRequest = false;
  isRefreshTable = false;
  resultData:any;

  constructor(
    private allFunction: GeneralFunctionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDetail: any,
    public dialogRef: MatDialogRef<SearchFormComponent>,
    private allApi: AllApiService,
    private router: Router,
  )
  {
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

    this.allApi.getDataWithFilter(this.allApi.productUrl, filter).subscribe(
      (data: any) =>{
        this.loadingGet = false;
        this.resultData = data.data;
      },
      (err:any) =>{
        this.loadingGet = false;
        console.log('Error', err)
      }
    )
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
