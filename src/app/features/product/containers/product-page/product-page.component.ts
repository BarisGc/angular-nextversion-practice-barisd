import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterOutlet],
  styles: [],
  template: '<router-outlet/>',
})
export class ProductPageComponent {}
