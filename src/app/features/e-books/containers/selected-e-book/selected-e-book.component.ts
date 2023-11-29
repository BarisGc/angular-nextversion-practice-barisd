import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EBook } from '../../models/e-book.model';
import { SelectedEBookActions } from '../../actions/selected-e-book.actions';

import * as fromEBooks from '@example-app/features/e-books/reducers';
@Component({
  selector: 'app-selected-e-book',
  templateUrl: './selected-e-book.component.html',
  styleUrls: ['./selected-e-book.component.scss'],
})
export class SelectedEBookComponent {
  eBook$!: Observable<EBook>;
  isSelectedBookInCollection$!: Observable<boolean>;

  constructor(private store: Store) {
    this.getInitialStoreData(store);
  }

  getInitialStoreData(store: Store) {
    this.eBook$ = store.select(
      fromEBooks.selectSelectedEBook
    ) as Observable<EBook>;
    this.isSelectedBookInCollection$ = store.select(
      fromEBooks.isSelectedEBookInCollection
    );
  }

  addToCollection(eBook: EBook) {
    this.store.dispatch(SelectedEBookActions.addEBook({ eBook }));
  }

  removeFromCollection(eBook: EBook) {
    this.store.dispatch(SelectedEBookActions.removeEBook({ eBook }));
  }
}
