import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-dessert-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MyCartComponent],
  templateUrl: './dessert-list.component.html',
  styleUrls: ['./dessert-list.component.css'],
  providers: [ProductsService],
})
export class DessertListComponent implements OnInit {
  data: any[] = [];

  constructor(
    private dataService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response.map((item: any) => ({
          ...item,
          quantity: 0,
          inCart: false,
        }));
      },
      error: (error) => console.error('Error while fetching data:', error),
    });
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.resetItemStates(cartItems);
    });
  }

  increment(item: any) {
    item.quantity++;
    if (item.inCart) {
      this.updateCart(item);
    }
    item.inCart = item.quantity > 0;
  }

  decrement(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      if (item.inCart) {
        this.updateCart(item);
      }
    }
    item.inCart = item.quantity > 0;
  }

  addToCart(item: any) {
    this.increment(item);
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      img: item.image.thumbnail,
    };
    this.cartService.addToCart(cartItem);
    item.inCart = true;
  }

  updateCart(item: any) {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      img: item.image.thumbnail,
    };
    this.cartService.updateCartItem(cartItem);
    console.log(cartItem);
  }
  resetItemStates(cartItems: CartItem[]) {
    this.data.forEach((dessert) => {
      const cartItem = cartItems.find((item) => item.id === dessert.id);
      if (!cartItem) {
        // If the item is not in the cart, reset it
        dessert.quantity = 0;
        dessert.inCart = false;
      }
    });
  }
}
