import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EBookCollectionPageActions } from '../actions/e-book-collection-page.actions';
import { EBook } from '../models/e-book.model';
import { SelectedEBookActions } from '../actions/selected-e-book.actions';
import { EBookStorageService } from '../services/e-book-storage.service';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.storageService.supported()),
    { dispatch: false }
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookCollectionPageActions.enter),
      switchMap(() =>
        this.storageService.getCollectionFromLocalStorage().pipe(
          map((eBooks: EBook[]) =>
            EBookCollectionPageActions.loadCollectionSuccess({ eBooks })
          ),
          catchError((error) =>
            of(EBookCollectionPageActions.loadCollectionFailure({ error }))
          )
        )
      )
    )
  );

  addEBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedEBookActions.addEBook),
      mergeMap(({ eBook }) =>
        this.storageService.addToLocalStorage([eBook]).pipe(
          map(() => EBookCollectionPageActions.addEBookSuccess({ eBook })),
          catchError(() =>
            of(EBookCollectionPageActions.addEBookFailure({ eBook }))
          )
        )
      )
    )
  );

  removeEBookFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EBookCollectionPageActions.removeEBook),
      mergeMap(({ eBook }) =>
        this.storageService.removeFromLocalStorage([eBook.id]).pipe(
          map(() => EBookCollectionPageActions.removeEBookSuccess({ eBook })),
          catchError(() =>
            of(EBookCollectionPageActions.removeEBookFailure({ eBook }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: EBookStorageService
  ) {}
}
