import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  // TODO: refactor baseUrl, use env maybe?
  baseUrl = `https://dummyjson.com/products`;

  httpService = inject(HttpClient);

  fetchProducts(): Observable<Product[]> {
    return this.httpService
      .get<ProductResponse>(this.baseUrl)
      .pipe(map((response) => response.products));
  }
}

interface ProductResponse {
  products: Product[];
}
