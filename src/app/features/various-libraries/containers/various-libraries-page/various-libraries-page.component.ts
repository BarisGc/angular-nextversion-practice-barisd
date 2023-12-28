import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VariousLibrariesTabsComponent } from '../various-libraries-tabs/various-libraries-tabs.component';

@Component({
  selector: 'app-commit-page',
  standalone: true,
  imports: [RouterOutlet, VariousLibrariesTabsComponent],
  styles: [],
  template: `
    <div class="grid-nogutter">
      <div class="col-12">
        <app-various-libraries-tabs
          ><div class="col-10 col-offset-1"><router-outlet /></div
        ></app-various-libraries-tabs>
      </div>
    </div>
  `,
})
export class VariousLibrariesPageComponent {}
