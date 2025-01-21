import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllApiService } from '../core/all-api.service';
import { CartService } from '../core/cart.service';
import { NGXToastrService } from '../core/function/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../core/order.service';
import { LocationService } from '../core/location.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent {
  message: string = 'Congratulations! Your order has been successfully placed!';
  orderId: any;
  quantity: number = 1;
  userId: any;
  CountCart: any;
  cartCount: any;
  nameUser: any;
  orderData: any;
  visible: boolean = false;
  balloons: any[] = [1, 2, 3, 4, 5]; 
  resultData:any[] = [];
  location: { latitude: number; longitude: number; accuracy: number ,  locationName?: string;} | null = null;
  errorMessage: string | null = null;

  // inputGroup = new FormGroup({
  //   paymentMethod: new FormControl(''),
  //   userId: new FormControl(''),
  //   name: new FormControl(''),
  //   longitude: new FormControl(''),
  //   latitude: new FormControl('')
  // })

  paymentOptions = [
    { value: 'ABA', label: 'ABA', image: '../../assets/images/aba-pay-web.png' },
    { value: 'Credit Card', label: 'Credit Card', image: '../../assets/images/credit-debit-card.png' },
    { value: 'AC', label: 'Xpay', image: '../../assets/images/xpay.png' },
    { value: 'Wing', label: 'Wing', image: '../../assets/images/Wing.png' },
    { value: 'Cash On Delivery', label: 'Cash On Delivery', image: '../../assets/images/cod-kh-en.png' },
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

  constructor(
    private allApi: AllApiService,
    private route: ActivatedRoute,
    private ToastrService: NGXToastrService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private locationService: LocationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['order_id'];
      console.log(this.orderId)
    });

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.userId = user.data.user.id;

    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });


    this.orderData = this.orderService.getOrderData();
    console.log('Order Data:', this.orderData);

    this.getAllData()
  }

  ngOnInit() {
    const data = localStorage.getItem('user');
    if (data) {
      const parsedData = JSON.parse(data);
      this.nameUser = parsedData.data.user.name;
    } else {
      this.nameUser = null;
    }

    this.fetchLocation()
    
  }

  // get f() {
  //   return this.inputGroup.controls
  // }

  getAllData() {
    this.allApi.getDataWithFilter(this.allApi.cartUrl).subscribe(
      (data: any) => {
        this.resultData = data.data;
        console.log('data cart', data)
      },
      (err: any) => {
        console.log('Error', err)
      }
    )
  }



  closeDialog() {
    this.visible = false;
    this.router.navigate(['/']);  
  }

  fetchLocation(): void {
    this.locationService
      .getCurrentLocation()
      .then((location) => {
        this.location = location;
        console.log('User location:', location);
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error(error);
      });
  }
  

  Payment() {
    const inputData = {
      paymentMethod: 'wing',
      orderId: Number(this.orderId.product.id),
      location: {
          name: this.location?.locationName,
          longitude: this.location?.longitude,
          latitude: this.location?.latitude,
      }
    }
    console.log('json data order', inputData)

    // this.allApi.createData(this.allApi.paymentUrl, inputData).subscribe(
    //   (data: any) => {
    //     console.log('data order success', data)
    //     this.visible = true;
    //     this.deleteCart();
    //   }
    // )
  }


  deleteCart(){
    this.allApi.deleteData(this.allApi.cartUrl, this.orderId.id).subscribe()
  }


}
