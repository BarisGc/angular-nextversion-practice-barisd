import { Component, OnInit } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromEBooks from '@example-app/features/e-books/reducers';
import { EBookCollectionPageActions } from '../../actions/e-book-collection-page.actions';
@Component({
  selector: 'app-e-book-collection-page',
  templateUrl: './e-book-collection-page.component.html',
  styleUrls: ['./e-book-collection-page.component.scss'],
})
export class EBookCollectionPageComponent implements OnInit {
  collectedEBooks$!: Observable<EBook[]>;
  constructor(private store: Store) {
    this.collectedEBooks$ = this.store.select(fromEBooks.selectEBookCollection);
  }

  ngOnInit(): void {
    this.checkIsCollectionStoraged();
  }

  checkIsCollectionStoraged() {
    this.store.dispatch(EBookCollectionPageActions.enter());
  }
}
