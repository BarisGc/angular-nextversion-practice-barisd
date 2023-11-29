import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EBook } from '../models/e-book.model';
// TODO: Check if roll-up approach (index.ts) is important

export const EBookCollectionPageActions = createActionGroup({
  source: 'EBook Collection Page',
  events: {
    // Navigation
    Enter: emptyProps(),
    Leave: emptyProps(),

    /**
     * Load Collection
     */
    'Load Collection': emptyProps(),
    'Load Collection Success': props<{ eBooks: EBook[] }>(),
    'Load Collection Failure': props<{ error: any }>(),

    /**
     * Add EBook to Collection
     */
    'Add EBook Success': props<{ eBook: EBook }>(),
    'Add EBook Failure': props<{ eBook: EBook }>(),

    /**
     * Remove EBook from Collection
     */
    'Remove EBook': props<{ eBook: EBook }>(),
    'Remove EBook Success': props<{ eBook: EBook }>(),
    'Remove EBook Failure': props<{ eBook: EBook }>(),

    /**
     * View EBook from Collection
     */
    'View EBook': emptyProps(),
    'View EBook Success': props<{ eBook: EBook }>(),
    'View EBook Failure': props<{ eBook: EBook }>(),

    /**
     * Edit Collection Item Notes
     */
    'Edit Collection Item Notes': emptyProps(),
    'Edit Collection Item Notes Success': props<{ eBook: EBook }>(),
    'Edit Collection Item Notes Failure': props<{ eBook: EBook }>(),
  },
});

// 1 - Using Action Creator - Examples
// products-page.actions.ts
// import { createAction, props } from '@ngrx/store';

// // defining an action without payload
// export const opened = createAction('[Products Page] Opened');

// // defining an action with payload using the `props` function
// export const paginationChanged = createAction(
//   '[Products Page] Pagination Changed',
//   props<{ page: number; offset: number }>()
// );

// // defining an action with payload using the props factory
// export const queryChanged = createAction(
//   '[Product Page] Query Changed',
//   (query: string) => ({ query })
// );

//  2 - createActionGroup - Examples
// https://dev.to/ngrx/ngrx-action-group-creator-1deh
// Advantages: Action group creator improves developer experience by reducing code in action files. It eliminates the need to create barrel files or use named imports for actions, define the same action source in multiple places, and write the same name for the event and the action creator twice. It also enforces good action hygiene by using the "[Source] Event" pattern in defining action types.
// Limitations: We can define different names for an event and an action creator using the createAction function in opposite to createActionGroup function.

// const authApiActions = createActionGroup({
//   source: 'Auth API',
//   events: {
//     // defining events with payload using the `props` function
//     'Login Success': props<{ userId: number; token: string }>(),
//     'Login Failure': props<{ error: string }>(),

//     // defining an event without payload using the `emptyProps` function
//     'Logout Success': emptyProps(),

//     // defining an event with payload using the props factory
//     'Logout Failure': (error: Error) => ({ error }),
//   },
// });
