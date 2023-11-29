import { createActionGroup, props } from '@ngrx/store';
import { EBook } from '../models/e-book.model';
export const EBooksApiActions = createActionGroup({
  source: 'EBooks Api',
  events: {
    'Search Success': props<{ eBooks: EBook[] }>(),
    'Search Failure': props<{ errorMsg: string }>(),
  },
});
