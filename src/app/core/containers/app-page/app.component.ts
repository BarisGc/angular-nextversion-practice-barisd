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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = of(true);

  showSidenav$: Observable<boolean> = of(false);
  loggedIn$: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) {
    this.showSidenav$ = of(false);
    this.loggedIn$ = of(false);
  }

  ngOnInit() {
    this.handleNavigationLoading();
    this.checkUserAccess();
    this.checkSidenav();
  }

  handleNavigationLoading() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading$ = of(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading$ = of(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  checkUserAccess() {
    this.loggedIn$ = this.authService.user$ ? of(true) : of(false);
  }

  checkSidenav() {
    this.showSidenav$ = this.layoutService.showSidenav$;
  }
}
