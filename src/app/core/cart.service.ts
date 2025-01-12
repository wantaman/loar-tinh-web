import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private cartCountSource = new BehaviorSubject<number>(this.getCartCountFromLocalStorage());
  cartCount$ = this.cartCountSource.asObservable();

  constructor() {}

  private getCartCountFromLocalStorage(): number {
    const storedCount = localStorage.getItem('cartCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  }

  updateCartCount(newCount: number) {
    localStorage.setItem('cartCount', newCount.toString());
    this.cartCountSource.next(newCount);
  }

  refreshCartCount() {
    const newCount = this.getCartCountFromLocalStorage();
    this.cartCountSource.next(newCount);
  }
}
