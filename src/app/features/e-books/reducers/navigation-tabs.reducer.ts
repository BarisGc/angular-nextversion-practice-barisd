import { createReducer, on } from '@ngrx/store';
import { NavigationTab } from '../models/e-book-navigation-tab';
import { EBookNavigationTabActions } from '../actions/e-book-navigation-tab-actions';

export const navigationTabsFeatureKey = 'navigationTabs';

export interface State {
  tabs: NavigationTab[];
}

const initialState: State = {
  tabs: [
    {
      name: 'stored',
      url: 'stored',
      isShown: true,
      isDisabled: false,
      isActive: true,
    },
    {
      name: 'find',
      url: 'find',
      isShown: true,
      isDisabled: false,
      isActive: false,
    },
    {
      name: 'collection',
      url: 'collection',
      isShown: true,
      isDisabled: false,
      isActive: false,
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(EBookNavigationTabActions.addTab, (state, { tab }) => ({
    ...state,
    tabs: [...state.tabs.filter((_tab) => _tab.name !== tab.name), tab],
  })),
  on(EBookNavigationTabActions.removeTab, (state, { tab }) => ({
    ...state,
    tabs: state.tabs.filter((_tab) => _tab.name !== tab.name),
  })),
  on(EBookNavigationTabActions.updateTab, (state, { tab }) => ({
    ...state,
    // TODO: retry using map and check if works anyways
    tabs: state.tabs.map((_tab) => (_tab.name === tab.name ? tab : _tab)),
  }))
);

export const getTabs = (state: State) => state.tabs;
