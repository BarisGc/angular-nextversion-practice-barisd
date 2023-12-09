import { NavigationTab } from '../../../../shared/models/navigation-tab';
import { NavigationTabsService } from './../../../../shared/services/navigation-tabs.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-e-books-tabs',
  styles: [],
  template: ` <app-navigation-tabs><router-outlet /></app-navigation-tabs> `,
})
export class EBooksTabsComponent {
  navigationTabsService = inject(NavigationTabsService);

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.setTabs();
  }

  setTabs() {
    this.navigationTabsService.clearTabs();
    this.navigationTabsService.addTabs(this.getInitialTabs());
  }

  getInitialTabs(): NavigationTab[] {
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
    return initialTabs;
  }
}
