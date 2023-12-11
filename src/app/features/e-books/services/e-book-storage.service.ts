import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError, EMPTY } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { EBook } from '../models/e-book.model';
import { ToastrService } from 'ngx-toastr';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'example-app-local-storage',
  { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class EBookStorageService {
  private collectionKey = 'e-books-myCollection';
  private readBooksKey = 'readBooks';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getFromlocalStorage(key: string) {
    return this.supported().pipe(
      map((_) => this.storage.getItem(key)),
      map((value: string | null) => (value ? JSON.parse(value) : [])),
      catchError((err) => {
        this.toastrService.error(err);
        return EMPTY;
      })
    );
  }

  saveToLocalStorage(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCollectionFromLocalStorage(): Observable<EBook[]> {
    return this.getFromlocalStorage(this.collectionKey);
  }

  addToLocalStorage(records: EBook[]): Observable<EBook[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: EBook[]) => [...value, ...records]),
      tap((value: EBook[]) => {
        this.saveToLocalStorage(this.collectionKey, value);
      }),
      catchError((err) => {
        this.toastrService.error(err);
        return EMPTY;
      })
    );
  }

  removeFromLocalStorage(ids: Array<string>): Observable<EBook[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: EBook[]) => value.filter((item) => !ids.includes(item.id))),
      tap((value: EBook[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      ),
      catchError((err) => {
        this.toastrService.error(err);
        return EMPTY;
      })
    );
  }

  saveReadBooksInLocalStorage(ids: Array<string>) {
    this.saveToLocalStorage(this.readBooksKey, ids);
  }

  getReadBooksIdsFromLocalStorage(): Observable<string[]> {
    return this.getFromlocalStorage(this.readBooksKey);
  }

  deleteKeyFromLocalStorage(): Observable<boolean> {
    return this.supported().pipe(
      map(() => true),
      tap(() => this.storage.removeItem(this.collectionKey)),
      catchError((err) => {
        this.toastrService.error(err);
        return EMPTY;
      })
    );
  }

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage,
    private toastrService: ToastrService
  ) {}
}
