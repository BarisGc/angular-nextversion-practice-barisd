import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EBookNavigationService {
  private navigationTabsSub = new BehaviorSubject<Tab[]>(initialTabs);
  navigationTabs$ = this.navigationTabsSub.asObservable();
  get navigationTabs(): Tab[] {
    return this.navigationTabsSub.getValue();
  }

  private selectedTabIndexSub = new BehaviorSubject<string>('');
  selectedTabIndex$ = this.selectedTabIndexSub.asObservable();
  get selectedTabIndex(): string {
    return this.selectedTabIndexSub.getValue();
  }

  constructor(private route: ActivatedRoute) {}

  addTab(tab: Tab) {
    const excludeOldTab: Tab[] = this.navigationTabs.slice(0, 3);
    const newTabsState = [...excludeOldTab, tab];

    this.navigationTabsSub.next(newTabsState);
  }

  removeTab(tab: Tab) {
    const newTabsState: Tab[] = this.navigationTabs.filter(
      (_tab) => _tab.name !== tab.name
    );

    this.navigationTabsSub.next(newTabsState);
  }

  updateTab(tab: Tab) {
    const newTabsState: Tab[] = this.navigationTabs.map((_tab) =>
      _tab.name === tab.name ? tab : _tab
    );

    this.navigationTabsSub.next(newTabsState);
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
