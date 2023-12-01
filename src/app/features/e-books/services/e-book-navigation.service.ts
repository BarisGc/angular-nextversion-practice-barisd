import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EBookNavigationService {
  private navigationTabsSubs = new BehaviorSubject(initialTabs);

  navigationTabs$ = this.navigationTabsSubs.asObservable();

  constructor() {}

  addTab(tab: Tab) {
    const excludeOldTab: Tab[] = this.navigationTabsSubs
      .getValue()
      .filter((_tab) => _tab.name !== tab.name);
    const newTabsState = [...excludeOldTab, tab];

    this.navigationTabsSubs.next(newTabsState);
  }

  removeTab(tab: Tab) {
    const newTabsState: Tab[] = this.navigationTabsSubs
      .getValue()
      .filter((_tab) => _tab.name !== tab.name);

    this.navigationTabsSubs.next(newTabsState);
  }

  updateTab(tab: Tab) {
    const newTabsState: Tab[] = this.navigationTabsSubs
      .getValue()
      .filter((_tab) => (_tab.name === tab.name ? tab : _tab));

    this.navigationTabsSubs.next(newTabsState);
  }
}

interface Tab {
  name: string;
  url: string;
  isShown: boolean;
  isDisabled: boolean;
  isActive: boolean;
}

const initialTabs = [
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
];
