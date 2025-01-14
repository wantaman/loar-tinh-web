import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllApiService } from '../core/all-api.service';
import { CartService } from '../core/cart.service';
import { NGXToastrService } from '../core/function/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../core/order.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent {
  message: string = 'Congratulations! Your order has been successfully placed!';
  productId: string | null = null;
  quantity: number = 1;
  userId: any;
  CountCart: any;
  cartCount: any;
  nameUser: any;
  orderData: any;
  visible: boolean = false;
  balloons: any[] = [1, 2, 3, 4, 5]; 

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
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
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


    this.orderData = this.orderService.getOrderData();
    console.log('Order Data:', this.orderData);


  }

  ngOnInit() {
    const data = localStorage.getItem('user');
    if (data) {
      const parsedData = JSON.parse(data);
      this.nameUser = parsedData.data.user.name;
    } else {
      this.nameUser = null;
    }
    
  }


  closeDialog() {
    this.visible = false;
    this.router.navigate(['/']);  
  }
  

  Payment() {
    const inputData = {
      paymentMethod: "Wing",
      orderId: 2,
      location: {
          name: "Torl Svay prey",
          longitude: 33.5554,
          latitude: 2.255,
      }
    }
    console.log('json data order', inputData)

    this.allApi.createData(this.allApi.paymentUrl, inputData).subscribe(
      (data: any) => {
        console.log('data order success', data)
        this.visible = true;
      }
    )
  }


}
