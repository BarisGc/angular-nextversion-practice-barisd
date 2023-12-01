import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { EBookStorageService } from './e-book-storage.service';
import { EBook } from '../models/e-book.model';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EBookCollectionService {
  private collectedEBooksSub = new BehaviorSubject<EBook[]>([]);
  private loadingSub = new BehaviorSubject<boolean>(false);

  collectedEBooks$ = this.collectedEBooksSub.asObservable();
  loading$ = this.loadingSub.getValue();

  constructor(
    private storageService: EBookStorageService,
    private toastrService: ToastrService
  ) {}

  loadCollection() {
    this.storageService.getCollectionFromLocalStorage().pipe(
      tap(() => this.loadCollectionLoading(true)),
      map((eBooks: EBook[]) => this.loadCollectionSuccess(eBooks)),
      catchError((err: string) => {
        this.loadCollectionFailure(err);
        return of([]);
      })
    );
  }

  loadCollectionLoading(loading: boolean) {
    this.loadingSub.next(loading);
  }

  loadCollectionSuccess(collectedEBooks: EBook[]) {
    this.collectedEBooksSub.next(collectedEBooks);

    this.loadCollectionLoading(false);
  }

  loadCollectionFailure(err: string) {
    this.toastrService.error(err);

    this.loadCollectionLoading(false);
  }

  /**
   * Optimistically add book to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by removing the book.
   */
  optimisticallyAddEBookToCollection(newCollectedEBook: EBook) {
    const collectedEBooks = this.collectedEBooksSub.getValue();
    const isDuplicatedId = collectedEBooks.some(
      (oldCollectedEBook) => oldCollectedEBook.id === newCollectedEBook.id
    );

    if (!isDuplicatedId) {
      const newCollectedEBooksState = [
        ...this.collectedEBooksSub.getValue(),
        newCollectedEBook,
      ];

      this.collectedEBooksSub.next(newCollectedEBooksState);
    }
  }

  addEBookToCollection(eBook: EBook) {
    this.optimisticallyAddEBookToCollection(eBook);
  }

  removeEBookFromCollectionFailure(eBook: EBook) {
    this.optimisticallyAddEBookToCollection(eBook);
  }

  /**
   * Optimistically remove book from collection.
   * If addBook fails, we "undo" adding the book.
   */
  optimisticallyRemoveEBookFromCollection(unCollectedEBook: EBook) {
    const collectedEBooks = this.collectedEBooksSub.getValue();
    const newCollectedEBooksState = collectedEBooks.filter(
      (collectedEBook) => collectedEBook.id !== unCollectedEBook.id
    );

    this.collectedEBooksSub.next(newCollectedEBooksState);
  }

  addEBookToCollectionFailure(eBook: EBook) {
    this.optimisticallyRemoveEBookFromCollection(eBook);
  }

  removeEBookFromCollection(eBook: EBook) {
    this.optimisticallyRemoveEBookFromCollection(eBook);
  }
}
