import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';

import * as fromFind from '@example-app/features/e-books/reducers/find.reducer';
import * as fromEBooks from '@example-app/features/e-books/reducers/e-books.reducer';
import * as fromCollection from '@example-app/features/e-books/reducers/collection.reducer';
import * as fromNavigationTabs from '@example-app/features/e-books/reducers/navigation-tabs.reducer';
import * as fromRoot from '@example-app/reducers';

import { EBook } from '@example-app/features/e-books/models/e-book.model';

export const eBooksPageFeatureKey = 'eBooksPage';

export interface EBooksState {
  [fromFind.findFeatureKey]: fromFind.State;
  [fromEBooks.eBooksFeatureKey]: fromEBooks.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
  [fromNavigationTabs.navigationTabsFeatureKey]: fromNavigationTabs.State;
}

export interface State extends fromRoot.State {
  [eBooksPageFeatureKey]: EBooksState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: EBooksState | undefined, action: Action) {
  return combineReducers({
    [fromFind.findFeatureKey]: fromFind.reducer,
    [fromEBooks.eBooksFeatureKey]: fromEBooks.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
    [fromNavigationTabs.navigationTabsFeatureKey]: fromNavigationTabs.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.booksState$ = state$.pipe(select(getBooksState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectEBooksPageState =
  createFeatureSelector<EBooksState>(eBooksPageFeatureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

// "e-books" reducer's selectors
export const selectEBookEntitiesState = createSelector(
  selectEBooksPageState,
  (state) => state.eBooks
);

export const selectSelectedEBookId = createSelector(
  selectEBookEntitiesState,
  fromEBooks.selectEBookId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */

// TODO: use these as an example
export const {
  selectIds: selectEBookIds,
  selectEntities: selectAllEBookEntities,
  selectAll: selectAllEBooks,
  selectTotal: selectTotalEBooks,
} = fromEBooks.adapter.getSelectors(selectEBookEntitiesState);

export const selectSelectedEBook = createSelector(
  selectAllEBookEntities,
  selectSelectedEBookId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
// "find" reducer's selectors
export const selectFindState = createSelector(
  selectEBooksPageState,
  (state) => state.find
);

export const selectFoundedBookIds = createSelector(
  selectFindState,
  fromFind.getIds
);

export const selectFindQuery = createSelector(
  selectFindState,
  fromFind.getQuery
);
export const selectFindLoading = createSelector(
  selectFindState,
  fromFind.getLoading
);
export const selectFindError = createSelector(
  selectFindState,
  fromFind.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const selectFindResults = createSelector(
  selectAllEBookEntities,
  selectFoundedBookIds,
  (eBooks, foundedIds) => {
    return (
      foundedIds
        .map((id) => eBooks[id])
        // TODO: Check if necessary?
        .filter((eBook): eBook is EBook => eBook != null)
    );
  }
);

// "collection" reducer's selectors
export const selectCollectionState = createSelector(
  selectEBooksPageState,
  (state) => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionEBookIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectEBookCollection = createSelector(
  selectAllEBookEntities,
  selectCollectionEBookIds,
  (entities, ids) => {
    return (
      ids
        .map((id) => entities[id])
        // TODO: Debug and inspect
        .filter((book): book is EBook => book != null)
    );
  }
);

export const isSelectedEBookInCollection = createSelector(
  selectCollectionEBookIds,
  selectSelectedEBookId,
  // TODO: Debug and inspect
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);

// "navigation tabs" reducer's selectors
export const selectNavigationTabsState = createSelector(
  selectEBooksPageState,
  (state) => state.navigationTabs
);

export const selectNavigationTabs = createSelector(
  selectNavigationTabsState,
  fromNavigationTabs.getTabs
);
