import { ToastrService } from 'ngx-toastr';
import { EBookCollectionService } from '../../services/e-book-collection.service';
import { EBookDataService } from '../../services/e-book-data.service';
import { Component } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { tap, Subscription, finalize, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    private eBookCollectionService: EBookCollectionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getInitialState();
    this.getCollectedEBooks();
  }

  getInitialState() {
    this.getSelectedEBook();
  }

  getSelectedEBook() {
    const selectedEBookStream = this.eBookDataService.selectedEBook$
      .pipe(
        tap((book) => {
          this.selectedEBook = book as EBook;
        })
      )
      .subscribe();

    this.masterSubscription.add(selectedEBookStream);
  }

  getCollectedEBooks() {
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
    this.masterSubscription.add(collectedEBooksStream);
  }

  addToCollection(eBook: EBook) {
    const collectionAddStream$ = this.eBookCollectionService
      .addEBooks([eBook])
      .pipe(
        map((_) => {
          this.router.navigate(['/e-books/find']);
          this.toastrService.success('eBook added to collection');
        })
      )
      .subscribe();
    this.masterSubscription.add(collectionAddStream$);
  }

  removeFromCollection(eBook: EBook) {
    const collectionRemoveStream$ = this.eBookCollectionService
      .removeEBooks([eBook.id])
      .subscribe();
    this.masterSubscription.add(collectionRemoveStream$);
  }

  ngOnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}
