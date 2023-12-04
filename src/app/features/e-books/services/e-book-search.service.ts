import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  tap,
  EMPTY,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  finalize,
} from 'rxjs';
import { EBookApiService } from './e-book-api.service';
import { EBook } from '../models/e-book.model';

// TODO: Check if separating data and api necessary?
@Injectable({
  providedIn: 'root',
})
export class EBookSearchService {
  private foundedEBooksSub = new BehaviorSubject<EBook[]>([]);
  private loadingSub = new BehaviorSubject<boolean>(false);
  private errorSub = new BehaviorSubject<string>('');
  private querySub = new BehaviorSubject<string>('');

  foundedBooks$ = this.foundedEBooksSub.asObservable();
  loading$ = this.loadingSub.asObservable();
  error$ = this.errorSub.asObservable();
  query$ = this.querySub.asObservable();

  constructor(private eBookApiService: EBookApiService) {}

  getFoundedBooks() {
    return this.querySub.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query === '') return this.clearSearch();

        return this.eBookApiService.getEBooks(query).pipe(
          map((foundedEBooks) => this.searchEBooksSuccess(foundedEBooks)),
          finalize(() => this.searchEBooksLoading(false)),
          catchError((err) => this.searchEBooksFailure(err))
        );
      })
    );
  }

  searchEBooks(query: string) {
    this.searchEBooksLoading(true);
    this.querySub.next(query);
  }

  searchEBooksLoading(loading: boolean) {
    this.loadingSub.next(loading);
  }

  searchEBooksSuccess(foundedEBooks: EBook[]) {
    this.foundedEBooksSub.next(foundedEBooks);

    return foundedEBooks;
  }

  searchEBooksFailure(err: string) {
    this.errorSub.next(err);

    return EMPTY;
  }

  clearSearch() {
    this.foundedEBooksSub.next([]);
    this.loadingSub.next(false);
    this.errorSub.next('');
    this.querySub.next('');

    return EMPTY;
  }
}
