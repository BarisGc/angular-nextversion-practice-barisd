import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationTabsComponent } from '../../../../shared/navigation-tabs/navigation-tabs.component';
import { CommitTabsComponent } from '../commit-tabs/commit-tabs.component';

const PIPES: any = [];
const COMPONENTS: any = [CommitTabsComponent];
const MODULES: any = [];
const DIRECTIVES: any = [RouterOutlet];
@Component({
  selector: 'app-commit-page',
  standalone: true,
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
  styles: [],
  template: `
    <div class="grid">
      <div class="col-10 col-offset-1">
        <app-commit-tabs><router-outlet /></app-commit-tabs>
      </div>
    </div>
  `,
})
export class CommitPageComponent {}
