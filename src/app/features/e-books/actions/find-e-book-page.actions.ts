import { createActionGroup, props } from '@ngrx/store';
export const FindEBookPageActions = createActionGroup({
  source: 'Find EBook Page',
  events: {
    'Find EBooks': props<{ query: string }>(),
  },
});
