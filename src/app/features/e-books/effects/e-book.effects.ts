import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  asyncScheduler,
  catchError,
  debounceTime,
  EMPTY as empty,
  map,
  of,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FindEBookPageActions } from '../actions/find-e-book-page.actions';
import { EBook } from '../models/e-book.model';
import { EBooksApiActions } from '../actions/e-books-api.actions';
import { GoogleEBooksService } from '../services';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class EBookEffects {
  search$ = createEffect(
    () =>
      // TODO: try alternative and simpler way
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(FindEBookPageActions.findEBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            // TODO: Check if necessary? maybe try ui solution instead?
            if (query === '') {
              return empty;
            }

            const nextSearch$ = this.actions$.pipe(
              ofType(FindEBookPageActions.findEBooks),
              skip(1)
            );

            return this.googleEBooks.searchBooks(query).pipe(
              takeUntil(nextSearch$),
              map((eBooks: EBook[]) =>
                EBooksApiActions.searchSuccess({ eBooks })
              ),
              catchError((err) =>
                of(
                  EBooksApiActions.searchFailure({
                    errorMsg: `E-Book Search API failed - The E-Books Can't be Searched - Error: ${err.message}`,
                  })
                )
              )
            );
          })
        )
  );

  constructor(
    private actions$: Actions,
    private googleEBooks: GoogleEBooksService
  ) {}
}
