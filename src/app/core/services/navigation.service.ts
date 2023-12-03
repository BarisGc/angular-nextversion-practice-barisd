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
import { BehaviorSubject, of } from 'rxjs';
import { LayoutService } from './layout.service';
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  layoutLoadingSub = new BehaviorSubject<boolean>(false);
  layoutLoading$ = this.layoutLoadingSub.asObservable();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  setTitle() {
    return this.route.data.pipe(
      map((data) => `E-Book Module - ${data['title']}`),
      tap((title) => this.titleService.setTitle(title))
    );
  }

  getNavigationLoading() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.layoutLoadingSub.next(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.layoutLoadingSub.next(false);

          break;
        }
        default: {
          break;
        }
      }
    });

    return this.layoutLoading$;
  }
}
