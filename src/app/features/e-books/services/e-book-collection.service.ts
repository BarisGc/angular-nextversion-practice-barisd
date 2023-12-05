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
  collectedEBooks$ = this.collectedEBooksSub.asObservable();
  get _collectedEBooks(): EBook[] {
    return this.collectedEBooksSub.getValue();
  }

  private readBooksIdsSub = new BehaviorSubject<string[]>([]);
  readBooksIds$ = this.readBooksIdsSub.asObservable();
  get _readBooksIds(): string[] {
    return this.readBooksIdsSub.getValue();
  }

  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSub.asObservable();

  constructor(
    private storageService: EBookStorageService,
    private toastrService: ToastrService
  ) {}

  clearAllCollections() {
    const ids = this._collectedEBooks.map((eBook) => eBook.id);
    return this.removeEBooks(ids);
  }

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
  addEBooks(eBooks: EBook[]) {
    return this.storageService.addToLocalStorage(eBooks).pipe(
      tap(() => this.addEBookSuccess(eBooks)),
      catchError(() => {
        this.removeEBookFailure(eBooks);
        return of([]);
      })
    );
  }

  /**
   * case1: Optimistically(success) Remove book from collection,
   * case2: If addBook fails, we "undo" adding the book.
   */
  removeEBooks(ids: string[]) {
    return this.storageService.removeFromLocalStorage(ids).pipe(
      tap(() => this.removeEBookSuccess(ids)),
      catchError(() => {
        this.addEBookFailure(ids);
        return of([]);
      })
    );
  }

  addEBookSuccess(collectedEBooks: EBook[]) {
    this.optimicallyAddEBook(collectedEBooks);
  }
  removeEBookFailure(unCollectedEBooks: EBook[]) {
    this.optimicallyAddEBook(unCollectedEBooks);
  }

  addEBookFailure(ids: string[]) {
    this.optimicallyRemoveEBook(ids);
  }

  removeEBookSuccess(ids: string[]) {
    this.optimicallyRemoveEBook(ids);
  }

  optimicallyAddEBook(eBooks: EBook[]) {
    const ids = new Set(eBooks.map((e) => e.id));
    const merged = [
      ...this._collectedEBooks.filter((e) => !ids.has(e.id)),
      ...eBooks,
    ];

    this.collectedEBooksSub.next(merged);
  }

  optimicallyRemoveEBook(removedIds: string[]) {
    // const newEBooksState = this._collectedEBooks?.filter(
    //   (collectedEBook) => collectedEBook.id !== eBook.id
    // );

    // this.collectedEBooksSub.next(newEBooksState);

    const merged = [
      ...this._collectedEBooks.filter(
        (eBook) => !removedIds.some((id) => id === eBook.id)
      ),
    ];

    this.collectedEBooksSub.next(merged);
  }

  setReadBooks(ids: string[]) {
    this.readBooksIdsSub.next(ids);

    return this.readBooksIds$;
  }
}
