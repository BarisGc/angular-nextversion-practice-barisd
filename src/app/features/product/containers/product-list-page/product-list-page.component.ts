import { ProductDataService } from './../../services/product-data.service';
import { Observable, Subscription, map, of, tap } from 'rxjs';
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
        padding: 1rem 10rem 0rem 10rem;
      }
    `,
  ],
  template: `<div [ngClass]="'listContainer'">
    <app-product-list
      [products]="(products$ | async)!"
      [isLoading]="(isLoading$ | async)!"
    />
  </div>`,
})
export class ProductListPageComponent implements OnInit, OnDestroy {
  products$!: Observable<Product[]>;
  isLoading$: Observable<boolean> = of(true);

  productDataService = inject(ProductDataService);

  masterSubscription = new Subscription();

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading$ = this.productDataService.isLoading$;
    const productsStream$ = this.productDataService
      .getProducts()
      .pipe(
        tap((products) => {
          this.products$ = of(products);
        })
      )
      .subscribe();

    this.masterSubscription.add(productsStream$);
  }

  ngOnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}
