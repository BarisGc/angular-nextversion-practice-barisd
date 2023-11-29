import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map, take, tap } from 'rxjs';

import { EBook } from '../../models/e-book.model';
import { FindEBookPageActions } from '../../actions/find-e-book-page.actions';

import * as fromEBooks from '@example-app/features/e-books/reducers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-e-book-page',
  templateUrl: './find-e-book-page.component.html',
  styleUrls: ['./find-e-book-page.component.scss'],
})
export class FindEBookPageComponent {
  searchQuery$!: Observable<string>;
  eBooks$!: Observable<EBook[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string>;

  allStoredEBooks$!: Observable<any>;

  previewEBookRelativeUrl = '../view';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getInitialStoreData(store);
  }

  ngOnInit() {
    // this.routePractice();
  }

  getInitialStoreData(store: Store): void {
    this.searchQuery$ = store.select(fromEBooks.selectFindQuery).pipe(take(1));
    this.eBooks$ = store.select(fromEBooks.selectFindResults);
    this.loading$ = store.select(fromEBooks.selectFindLoading);
    this.error$ = store.select(fromEBooks.selectFindError);
  }

  bySearch(query: string) {
    this.store.dispatch(FindEBookPageActions.findEBooks({ query }));
  }

  routePractice() {
    const fragment = location.hash.substring(1);
    const [hash1, hash2] = fragment.split('=');
    console.log('hash1', hash1);
    console.log('hash2', hash2);
    console.log('fragment', this.route.snapshot.fragment);
    console.log('params', this.route.snapshot.params);
    console.log('queryParams', this.route.snapshot.queryParams);
    console.log('paramMap', this.route.snapshot.paramMap);
  }
}
