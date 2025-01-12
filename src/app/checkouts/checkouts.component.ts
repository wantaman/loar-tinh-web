import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllApiService } from '../core/all-api.service';
import { CartService } from '../core/cart.service';
import { NGXToastrService } from '../core/function/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent {
  productId: string | null = null;
  quantity: number = 1;
  userId: any;
  CountCart: any;
  cartCount: any;

  inputGroup = new FormGroup({
    paymentMethod: new FormControl(''),
    userId: new FormControl(''),
    name: new FormControl(''),
    longitude: new FormControl(''),
    latitude: new FormControl('')
  })

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

  constructor(
    private allApi: AllApiService,
    private route: ActivatedRoute,
    private ToastrService: NGXToastrService,
    private cartService: CartService
  ) {
    this.route.queryParams.subscribe(params => {
      this.productId = params['product_id'];
      console.log(this.productId)
    });

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.userId = user.data.user.id;

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });


  }

  ngOnInit() { }


  orderProduct() {
    const inputData = {
      "userId": this.userId,
      "paymentMethod": "Wing",
      "items": [
        {
          "productId": this.productId,
          "quantity": this.cartCount
        }
      ],

    }

    console.log('json data order', inputData)

    // this.allApi.createData(this.allApi.orderUrl, inputData).subscribe(
    //   (data: any) => {
    //     console.log('data order success', data)

    //   }
    // )
    
  }

  Payment() {
    const inputData = {
      // "userId": this.userId,
      // "items": [
      //   {
      //     "productId": this.productId,
      //     "quantity": this.cartCount
      //   }
      // ],

      "orderId":  this.userId,
      "location": {
          "name": "Torl Svay prey",
          "longitude": 33.5554,
          "latitude": 2.255,
      }
    }

    console.log('json data order', inputData)

    // this.allApi.createData(this.allApi.orderUrl, inputData).subscribe(
    //   (data: any) => {
    //     console.log('data order success', data)

    //   }
    // )
  }


}
