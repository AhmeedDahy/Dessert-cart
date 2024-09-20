import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  addToCart(item: CartItem) {
    let currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((it) => it.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }
    this.cartItems.next(currentItems);
  }

  removeFromCart(itemId: number) {
    let currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter((item) => item.id !== itemId));
  }
  updateCartItem(updatedItem: CartItem) {
    let items = this.cartItems.getValue();
    const index = items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = { ...items[index], quantity: updatedItem.quantity };
      this.cartItems.next(items);
    }
  }
  clearCart() {
    this.cartItems.next([]); // Clears the cart
  }
}
