import { Component } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { EBookNavigationService } from '../../../features/e-books/services/e-book-navigation.service';
import { RouterService } from '../../services/navigation.service';
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
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService,
    private routerService: RouterService
  ) {
    this.showSidenav$ = of(false);
    this.loggedIn$ = of(false);
  }

  ngOnInit() {
    this.setLayoutLoading();
    this.checkUserAccess();
    this.checkSidenav();
  }

  checkUserAccess() {
    this.loggedIn$ = this.authService.user$ ? of(true) : of(false);
  }

  checkSidenav() {
    this.showSidenav$ = this.layoutService.showSidenav$;
  }

  setLayoutLoading() {
    this.loading$ = this.routerService.getNavigationLoading();
  }
}
