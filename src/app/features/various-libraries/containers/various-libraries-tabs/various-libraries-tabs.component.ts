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
  selector: 'app-various-libraries-tabs',
  standalone: true,
  templateUrl: './various-libraries-tabs.component.html',
  styleUrl: './various-libraries-tabs.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class VariousLibrariesTabsComponent {
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
        name: 'Html2Canvas',
        url: 'html2canvas',
        isShown: true,
        isDisabled: false,
        isActive: true,
      },
    ];
    return initialTabs;
  }
}
