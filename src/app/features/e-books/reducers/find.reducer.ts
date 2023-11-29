import { createReducer, on } from '@ngrx/store';
import { FindEBookPageActions } from '../actions/find-e-book-page.actions';
import { EBooksApiActions } from '../actions/e-books-api.actions';

export const findFeatureKey = 'find';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export const reducer = createReducer(
  initialState,
  on(FindEBookPageActions.findEBooks, (state, { query }) => {
    return query === ''
      ? {
          ids: [],
          loading: false,
          error: '',
          query,
        }
      : {
          ...state,
          loading: true,
          error: '',
          query,
        };
  }),
  on(EBooksApiActions.searchSuccess, (state, { eBooks }) => ({
    ids: eBooks.map((eBook) => eBook.id),
    loading: false,
    error: '',
    query: state.query,
  })),
  on(EBooksApiActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
