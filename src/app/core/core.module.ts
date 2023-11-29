import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent, NotFoundPageComponent } from './containers';
import { MaterialModule } from '../material';
import {
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
} from './components';
import { SharedModule } from '../shared/shared.module';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [SharedModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
