import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { EBookStorageService } from './e-book-storage.service';
import { EBook } from '../models/e-book.model';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EBookCollectionService {
  private collectedEBooksSub = new BehaviorSubject<EBook[]>([]);
  private loadingSub = new BehaviorSubject<boolean>(false);

  collectedEBooks$ = this.collectedEBooksSub.asObservable();

  get _collectedEBooks(): EBook[] {
    return this.collectedEBooksSub.getValue();
  }

  loading$ = this.loadingSub.asObservable();

  constructor(
    private storageService: EBookStorageService,
    private toastrService: ToastrService
  ) {}

  loadCollection() {
    return this.storageService.getCollectionFromLocalStorage().pipe(
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
   * case1: Optimistically(success) Add book to collection,
   * case2: If removeBook fails, we "undo" adding the book.
   */
  optimicallyAddEBook(eBook: EBook) {
    return this.storageService.addToLocalStorage([eBook]).pipe(
      tap(() => this.addEBookSuccess(eBook)),
      catchError(() => {
        this.removeEBookFailure(eBook);
        return of([]);
      })
    );
  }

  /**
   * case1: Optimistically(success) Remove book from collection,
   * case2: If addBook fails, we "undo" adding the book.
   */
  optimicallyRemoveEBook(eBook: EBook) {
    return this.storageService.removeFromLocalStorage([eBook.id]).pipe(
      tap(() => this.removeEBookSuccess(eBook)),
      catchError(() => {
        this.addEBookFailure(eBook);
        return of([]);
      })
    );
  }

  addEBookSuccess(collectedEBook: EBook) {
    this.addEBook(collectedEBook);
  }
  removeEBookFailure(unCollectedEBook: EBook) {
    this.addEBook(unCollectedEBook);
  }

  addEBookFailure(collectedEBook: EBook) {
    this.removeEBook(collectedEBook);
  }

  removeEBookSuccess(unCollectedEBook: EBook) {
    this.removeEBook(unCollectedEBook);
  }

  addEBook(eBook: EBook) {
    const isDuplicatedId = this._collectedEBooks.some(
      (oldCollectedEBook) => oldCollectedEBook.id === eBook.id
    );

    if (!isDuplicatedId) {
      const newEBooksState = [...this._collectedEBooks, eBook];

      this.collectedEBooksSub.next(newEBooksState);
    }
  }

  removeEBook(eBook: EBook) {
    const newEBooksState = this._collectedEBooks?.filter(
      (collectedEBook) => collectedEBook.id !== eBook.id
    );

    this.collectedEBooksSub.next(newEBooksState);
  }
}
