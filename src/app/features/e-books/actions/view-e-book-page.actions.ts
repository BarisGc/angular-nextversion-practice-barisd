import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const ViewEBookPageActions = createActionGroup({
  source: 'View EBook Page',
  events: {
    'Select EBook': props<{ id: string }>(),
    'Unselect EBook': emptyProps(),
  },
});
