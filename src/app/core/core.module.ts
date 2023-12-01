import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent, NotFoundPageComponent } from './containers';
import {
  LayoutComponent,
  NavItemComponent,
  ToolbarComponent,
} from './components';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

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
