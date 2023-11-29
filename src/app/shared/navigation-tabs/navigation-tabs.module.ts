import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { NavigationTabsComponent } from './navigation-tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationTabsComponent],
  imports: [SharedModule, RouterModule],
  exports: [NavigationTabsComponent],
})
export class NavigationTabsModule {}
