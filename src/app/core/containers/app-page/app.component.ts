import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { RouterService } from '../../services/router.service';
import { isDevMode } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = of(false);

  showSidenav$: Observable<boolean> = of(false);
  loggedIn$: Observable<boolean> = of(false);

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
    private routerService: RouterService
  ) {
    this.showSidenav$ = of(false);
    this.loggedIn$ = of(false);
    console.log('isDevMode: ', isDevMode());
  }

  ngOnInit() {
    this.setLayoutLoading();
    this.checkUserAccess();
    this.checkSidenav();
    /*
     * Not necessary any more due to built-in TitleStrategy
     */
    // this.setTitle();
  }

  checkUserAccess() {
    this.loggedIn$ = this.authService.user$.pipe(
      map((user) => (user?.name ? true : false))
    );
  }

  checkSidenav() {
    this.showSidenav$ = this.layoutService.showSidenav$;
  }

  setLayoutLoading() {
    this.loading$ = this.routerService.getNavigationLoading();
  }

  setTitle() {
    this.routerService.setTitle().subscribe();
  }
}
