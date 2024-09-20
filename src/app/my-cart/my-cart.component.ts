import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isOrderConfirmed = false; // Add this property to control the overlay

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items.filter((item) => item.quantity > 0);
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  confirmOrder() {
    this.isOrderConfirmed = true; // Show overlay when order is confirmed
  }

  startNewOrder() {
    this.isOrderConfirmed = false; // Reset the overlay visibility for new order
    // Clear cart if needed
    this.cartService.clearCart();
  }
}
