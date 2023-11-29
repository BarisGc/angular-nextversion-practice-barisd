import { createReducer, on } from '@ngrx/store';
import { EBookCollectionPageActions } from '../actions/e-book-collection-page.actions';
import { SelectedEBookActions } from '../actions/selected-e-book.actions';

export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(EBookCollectionPageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    EBookCollectionPageActions.loadCollectionSuccess,
    (_state, { eBooks }) => ({
      loaded: true,
      loading: false,
      ids: eBooks.map((eBook) => eBook.id),
    })
  ),
  /**
   * Optimistically add book to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by removing the book.
   *
   * `on` supports handling multiple types of actions
   */
  on(
    SelectedEBookActions.addEBook,
    EBookCollectionPageActions.removeEBookFailure,
    (state, { eBook }) => {
      if (state.ids.indexOf(eBook.id) > -1) {
        return state;
      }
      return {
        ...state,
        ids: [...state.ids, eBook.id],
      };
    }
  ),
  /**
   * Optimistically remove book from collection.
   * If addBook fails, we "undo" adding the book.
   */
  on(
    SelectedEBookActions.removeEBook,
    EBookCollectionPageActions.addEBookFailure,
    (state, { eBook }) => ({
      ...state,
      ids: state.ids.filter((id) => id !== eBook.id),
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
