import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FindEBookPageActions } from '../../actions/find-e-book-page.actions';
import { EBook } from '../../models/e-book.model';
import * as fromEBooks from '@example-app/features/e-books/reducers';

@Component({
  selector: 'app-stored-e-books-page',
  templateUrl: './stored-e-books-page.component.html',
  styleUrls: ['./stored-e-books-page.component.scss'],
})
export class StoredEBooksPageComponent {
  eBooks$!: Observable<EBook[]>;

  previewEBookRelativeUrl = '../view';

  constructor(private store: Store) {
    this.getInitialStoreData(store);
  }

  ngOnInit() {}

  getInitialStoreData(store: Store) {
    this.eBooks$ = store.select(fromEBooks.selectAllEBooks);
  }
}
