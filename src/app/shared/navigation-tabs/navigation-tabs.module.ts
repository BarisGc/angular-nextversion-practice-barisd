import { NgModule } from '@angular/core';
import { NavigationTabsComponent } from './navigation-tabs.component';


// Note: Hybrid Usage(Standalone + Module) for practicing intentions
@NgModule({
  declarations: [],
  imports: [NavigationTabsComponent],
  exports: [NavigationTabsComponent],
})
export class NavigationTabsModule {}
