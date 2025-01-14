import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderData: any = null;

  setOrderData(data: any): void {
    this.orderData = data;
  }

  getOrderData(): any {
    return this.orderData;
  }
}
