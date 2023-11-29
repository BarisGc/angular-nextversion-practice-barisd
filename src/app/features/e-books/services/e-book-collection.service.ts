import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { EBookStorageService } from './e-book-storage.service';
import { EBook } from '../models/e-book.model';
import {
  BehaviorSubject,
  Observable,
  catchError,
  defer,
  map,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EBookCollectionService {
  collectionState = {
    idsSub: new BehaviorSubject<string[]>([]),
    pendingSub: new BehaviorSubject<boolean>(true),
  };

  ids$ = this.collectionState.idsSub.asObservable();
  pending$ = this.collectionState.pendingSub.asObservable();

  constructor(
    private storageService: EBookStorageService,
    private toastrService: ToastrService
  ) {
    this.setInitialServices();
  }

  setInitialServices() {
    this.loadCollection();
  }

  loadCollection() {
    this.storageService
      .getCollectionFromLocalStorage()
      .pipe(
        tap(() => this.loadCollectionPending(true)),
        map((eBooks: EBook[]) => this.loadCollectionSuccess(eBooks)),
        catchError((err: string) => {
          this.loadCollectionFailure(err);
          return of([]);
        })
      )
      .subscribe();
  }

  loadCollectionPending(isPending: boolean) {
    this.collectionState.pendingSub.next(isPending);
  }
  loadCollectionSuccess(eBooks: EBook[]) {
    const ids = eBooks.map((eBook) => eBook.id);
    this.collectionState.idsSub.next(ids);

    this.loadCollectionPending(false);
  }

  loadCollectionFailure(err: string) {
    this.toastrService.error(err);
  }

  /**
   * Optimistically add book to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by removing the book.
   */
  optimisticallyAddEBookToCollection(eBook: EBook) {
    const ids = this.collectionState.idsSub.getValue();
    const isDuplicatedId = ids.indexOf(eBook.id) > -1;

    if (!isDuplicatedId) this.collectionState.idsSub.next([...ids, eBook.id]);
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
  optimisticallyRemoveEBookFromCollection(eBook: EBook) {
    const ids = this.collectionState.idsSub.getValue();
    const filteredIds = ids.filter((id) => id !== eBook.id);

    this.collectionState.idsSub.next(filteredIds);
  }

  addEBookToCollectionFailure(eBook: EBook) {
    this.optimisticallyRemoveEBookFromCollection(eBook);
  }

  removeEBookFromCollection(eBook: EBook) {
    this.optimisticallyRemoveEBookFromCollection(eBook);
  }
}
