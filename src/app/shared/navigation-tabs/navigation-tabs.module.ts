import { NgModule } from '@angular/core';
import { NavigationTabsComponent } from './navigation-tabs.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationTabsComponent],
  imports: [SharedModule, MaterialModule, RouterModule],
  exports: [NavigationTabsComponent],
})
export class NavigationTabsModule {}
