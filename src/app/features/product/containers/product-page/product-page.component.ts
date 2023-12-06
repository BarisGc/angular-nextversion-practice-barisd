import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styles: [],
  template: '<router-outlet/>',
})
export class ProductPageComponent {}
