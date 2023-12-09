import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationTabsComponent } from '../../../../shared/navigation-tabs/navigation-tabs.component';
import { RouterOutlet } from '@angular/router';
import { NavigationTab } from '../../../../shared/models/navigation-tab';
import { NavigationTabsService } from '../../../../shared/services/navigation-tabs.service';
const PIPES: any = [];
const COMPONENTS: any = [NavigationTabsComponent];
const MODULES: any = [MatTabsModule];
const DIRECTIVES: any = [RouterOutlet];
@Component({
  selector: 'app-commit-tabs',
  standalone: true,
  templateUrl: './commit-tabs.component.html',
  styleUrl: './commit-tabs.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class CommitTabsComponent {
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
        name: 'Table (Pagination)',
        url: 'table-with-pagination',
        isShown: true,
        isDisabled: false,
        isActive: true,
      },
      {
        name: 'Infinite Scroll',
        url: 'infinite-scroll',
        isShown: true,
        isDisabled: false,
        isActive: false,
      },
      {
        name: 'Load More',
        url: 'load-more',
        isShown: true,
        isDisabled: false,
        isActive: false,
      },
      {
        name: 'Table (Virtual Scroll)',
        url: 'table-with-virtual-scroll',
        isShown: true,
        isDisabled: false,
        isActive: false,
      },
    ];
    return initialTabs;
  }
}
