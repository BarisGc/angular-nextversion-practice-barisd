import { createActionGroup, props } from '@ngrx/store';
import { EBook } from '../models/e-book.model';
export const EBookActions = createActionGroup({
  source: 'EBook',
  events: {
    'Load EBook': props<{ eBook: EBook }>(),
  },
});
