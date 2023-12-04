import { EBookCollectionService } from '../../services/e-book-collection-data.service';
import { EBookDataService } from '../../services/e-book-data.service';
import { Component } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-selected-e-book',
  templateUrl: './selected-e-book.component.html',
  styleUrls: ['./selected-e-book.component.scss'],
})
export class SelectedEBookComponent {
  selectedEBook!: EBook;
  collectedEBooks!: EBook[];
  isSelectedBookInCollection!: boolean;

  masterSubscription = new Subscription();

  constructor(
    private eBookDataService: EBookDataService,
    private eBookCollectionService: EBookCollectionService
  ) {}

  ngOnInit() {
    this.getInitialState();
  }

  getInitialState() {
    const selectedEBookStream = this.eBookDataService.selectedEBook$
      .pipe(
        tap((book) => {
          this.selectedEBook = book as EBook;
        })
      )
      .subscribe();

    const collectedEBooksStream = this.eBookCollectionService.collectedEBooks$
      .pipe(
        tap((books) => {
          this.collectedEBooks = books;
          this.isSelectedBookInCollection = this.collectedEBooks.some(
            (eBook) => eBook.id === this.selectedEBook.id
          );
        })
      )
      .subscribe();

    this.masterSubscription.add(selectedEBookStream);
    this.masterSubscription.add(collectedEBooksStream);
  }

  addToCollection(eBook: EBook) {
    const collectionAddStream$ = this.eBookCollectionService
      .optimicallyAddEBook(eBook)
      .subscribe();
    this.masterSubscription.add(collectionAddStream$);
  }

  removeFromCollection(eBook: EBook) {
    const collectionRemoveStream$ = this.eBookCollectionService
      .optimicallyRemoveEBook(eBook)
      .subscribe();
    this.masterSubscription.add(collectionRemoveStream$);
  }

  ngOnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}
