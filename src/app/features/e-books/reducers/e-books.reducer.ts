// import {
//   BookActions,
//   BooksApiActions,
//   CollectionApiActions,
//   ViewBookPageActions,
// } from '@example-app/books/actions';
// import { Book } from '@example-app/books/models';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { EBook } from '../models/e-book.model';
import { EBookActions } from '../actions/e-book.actions';
import { EBooksApiActions } from '../actions/e-books-api.actions';
import { ViewEBookPageActions } from '../actions/view-e-book-page.actions';
import { EBookCollectionPageActions } from '../actions/e-book-collection-page.actions';

export const eBooksFeatureKey = 'eBooks';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<EBook> {
  selectedEBookId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<EBook> = createEntityAdapter<EBook>({
  selectId: (eBook: EBook) => eBook.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedEBookId: null,
});

export const reducer = createReducer(
  initialState,
  /**
   * The addMany function provided by the created adapter
   * adds many records to the entity dictionary
   * and returns a new state including those records. If
   * the collection is to be sorted, the adapter will
   * sort each record upon entry into the sorted array.
   */
  on(
    EBooksApiActions.searchSuccess,
    EBookCollectionPageActions.loadCollectionSuccess,
    (state, { eBooks }) => {
      return adapter.addMany(eBooks, state);
    }
  ),
  /**
   * The addOne function provided by the created adapter
   * adds one record to the entity dictionary
   * and returns a new state including that records if it doesn't
   * exist already. If the collection is to be sorted, the adapter will
   * insert the new record into the sorted array.
   */
  on(EBookActions.loadEBook, (state, { eBook }) =>
    adapter.addOne(eBook, state)
  ),
  on(ViewEBookPageActions.selectEBook, (state, { id }) => ({
    ...state,
    selectedEBookId: id,
  })),
  on(ViewEBookPageActions.unselectEBook, (state) => ({
    ...state,
    selectedEBookId: null,
  }))
);

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const selectEBookId = (state: State) => state.selectedEBookId;
