import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DessertListComponent } from './dessert-list/dessert-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DessertListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dessert-cart';
}
