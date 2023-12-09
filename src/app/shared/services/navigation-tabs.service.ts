import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationTab } from '../models/navigation-tab';

@Injectable({
  providedIn: 'root',
})
export class NavigationTabsService {
  private navigationTabsSub = new BehaviorSubject<NavigationTab[]>([]);
  navigationTabs$ = this.navigationTabsSub.asObservable();
  get navigationTabs(): NavigationTab[] {
    return this.navigationTabsSub.getValue();
  }

  private selectedTabIndexSub = new BehaviorSubject<string>('');
  selectedTabIndex$ = this.selectedTabIndexSub.asObservable();
  get selectedTabIndex(): string {
    return this.selectedTabIndexSub.getValue();
  }

  constructor(private route: ActivatedRoute) {}

  addTabs(tabs: NavigationTab[]) {
    const excludeOldTab: NavigationTab[] = this.navigationTabs.slice(0, 3);
    const newTabsState = [...excludeOldTab, ...tabs];

    this.navigationTabsSub.next(newTabsState);
  }

  removeTabs(tabsRemoved: NavigationTab[]) {
    const newTabsState = this.navigationTabs.filter(
      (tab) => !tabsRemoved.some((removed) => removed.name === tab.name)
    );

    this.navigationTabsSub.next(newTabsState);
  }

  updateTab(tab: NavigationTab) {
    const newTabsState: NavigationTab[] = this.navigationTabs.map((_tab) =>
      _tab.name === tab.name ? tab : _tab
    );

    this.navigationTabsSub.next(newTabsState);
  }

  clearTabs() {
    this.navigationTabsSub.next([]);
  }
}
