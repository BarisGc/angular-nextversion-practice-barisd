import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  tap,
  Observable,
  EMPTY,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  timer,
} from 'rxjs';
import { EBookApiService } from './e-book-api.service';
import { EBook } from '../models/e-book.model';

@Injectable({
  providedIn: 'root',
})
export class EBookSearchService implements OnInit {
  private foundedEBooksSub = new BehaviorSubject<EBook[]>([]);
  private loadingSub = new BehaviorSubject<boolean>(false);
  private errorSub = new BehaviorSubject<string>('');
  private querySub = new BehaviorSubject<string>('');

  foundedBooks$ = this.foundedEBooksSub.asObservable();
  loading$ = this.loadingSub.asObservable();
  error$ = this.errorSub.asObservable();
  query$ = this.querySub.asObservable();

  constructor(private eBookApiService: EBookApiService) {}

  ngOnInit() {}

  searchEBooks(query: string) {
    if (query === '') {
      return this.clearSearch();
    } else {
      this.querySub.next(query);

      // return of(query).pipe(
      //   // filter((x) => !!x), i want falsy values that's why this line is commented out
      //   filter((x) => !!x),
      //   debounceTime(3000),
      //   distinctUntilChanged(),
      //   switchMap((query) => this.getEBooks(query))
      // );

      return this.query$.pipe(
        filter((x) => !!x),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((query) => this.getEBooks(query))
      );
    }
  }

  getEBooks(query: string) {
    return this.eBookApiService.getEBooks(query).pipe(
      tap(() => this.searchEBooksLoading(true)),
      map((foundedEBooks) => this.searchEBooksSuccess(foundedEBooks)),
      catchError((err) => this.searchEBooksFailure(err))
    );
  }

  searchEBooksLoading(loading: boolean) {
    this.loadingSub.next(loading);
  }

  searchEBooksSuccess(foundedEBooks: EBook[]) {
    this.foundedEBooksSub.next(foundedEBooks);
    this.searchEBooksLoading(false);

    return foundedEBooks;
  }

  searchEBooksFailure(err: string) {
    this.errorSub.next(err);
    this.searchEBooksLoading(false);

    return of(EMPTY);
  }

  clearSearch() {
    this.foundedEBooksSub.next([]);
    this.loadingSub.next(false);
    this.errorSub.next('');
    this.querySub.next('');

    return of(EMPTY);
  }
}
