import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { of } from 'rxjs';
import { LayoutService } from './layout.service';
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private layoutService: LayoutService
  ) {
    this.setTitle();
  }

  setTitle() {
    this.route.data.pipe(
      map((data) => `E-Book Module - ${data['title']}`),
      tap((title) => this.titleService.setTitle(title))
    );
  }

  handleNavigationLoading() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.layoutService.setLoading(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.layoutService.setLoading(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
