import { createActionGroup, props } from '@ngrx/store';
import { EBook } from '../models/e-book.model';
export const SelectedEBookActions = createActionGroup({
  source: 'Selected EBook',
  events: {
    /**
     * Add EBook to Collection
     */
    'Add EBook': props<{ eBook: EBook }>(),

    /**
     * Remove EBook from Collection
     */
    'Remove EBook': props<{ eBook: EBook }>(),

    /**
     * Edit EPersonal Book Notes
     */
    'Edit Personal EBook Notes': props<{ eBook: EBook }>(),
  },
});
