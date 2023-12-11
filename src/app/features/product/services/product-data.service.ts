import { ToastrService } from 'ngx-toastr';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, shareReplay, tap, EMPTY } from 'rxjs';
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

  private isLoadingSub = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSub.asObservable();
  get _isLoading(): boolean {
    return this.isLoadingSub.getValue();
  }

  productApiService = inject(ProductApiService);
  toastrService = inject(ToastrService);

  getProducts(): Observable<Product[]> {
    this.isLoadingSub.next(true);
    return this.productApiService.fetchProducts().pipe(
      tap((data) => {
        this.productsSub.next(data);
      }),
      catchError((err) => {
        this.toastrService.error(err);
        return EMPTY;
      }),
      finalize(() => this.isLoadingSub.next(false)),
      shareReplay(1)
    );
  }
}
