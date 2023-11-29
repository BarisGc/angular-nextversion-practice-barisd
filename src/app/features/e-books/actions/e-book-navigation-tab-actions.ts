import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NavigationTab } from '../models/e-book-navigation-tab';

export const EBookNavigationTabActions = createActionGroup({
  source: 'E-Book Navigation Tab',
  events: {
    'Add Tab': props<{ tab: NavigationTab }>(),
    'Update Tab': props<{ tab: NavigationTab }>(),
    'Remove Tab': props<{ tab: NavigationTab }>(),
  },
});
