import { ProductDataService } from './../../services/product-data.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Product } from '../../models/product';
import { AsyncPipe, NgClass } from '@angular/common';

const PIPES = [AsyncPipe];
const COMPONENTS = [ProductListComponent];
const DIRECTIVES = [NgClass];
@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [...PIPES, ...COMPONENTS, ...DIRECTIVES],
  styles: [
    `
      .listContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 10rem 10rem 10rem;
      }
    `,
  ],
  template: `<div [ngClass]="'listContainer'">
    <app-product-list [products]="(products$ | async)!" />
  </div>`,
})
export class ProductListPageComponent implements OnInit, OnDestroy {
  products$!: Observable<Product[]>;

  productDataService = inject(ProductDataService);

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productDataService.getProducts();
    this.productDataService.getProducts().subscribe();
  }

  ngOnDestroy() {}
}
