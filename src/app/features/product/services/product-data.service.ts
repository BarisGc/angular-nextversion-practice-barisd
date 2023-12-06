import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private productsSub = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSub.asObservable();
  get _products(): Product[] {
    return this.productsSub.getValue();
  }

  productApiService = inject(ProductApiService);

  getProducts() {
    return this.productApiService.fetchProducts().pipe(
      tap((data) => this.productsSub.next(data)),
      shareReplay(1)
    );
  }
}
