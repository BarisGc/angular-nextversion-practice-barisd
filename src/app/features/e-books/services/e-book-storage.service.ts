import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
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
  private collectionKey = 'e-books-app-myCollection';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getCollectionFromLocalStorage(): Observable<EBook[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : [])),
      catchError((err) => {
        this.toastrService.error(err);
        return of([]);
      })
    );
  }

  addToLocalStorage(records: EBook[]): Observable<EBook[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: EBook[]) => [...value, ...records]),
      tap((value: EBook[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      ),
      catchError((err) => {
        this.toastrService.error(err);
        return of([]);
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
        return of([]);
      })
    );
  }

  deleteKeyFromLocalStorage(): Observable<boolean> {
    return this.supported().pipe(
      map(() => true),
      tap(() => this.storage.removeItem(this.collectionKey)),
      catchError((err) => {
        this.toastrService.error(err);
        return of(false);
      })
    );
  }

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage,
    private toastrService: ToastrService
  ) {}
}