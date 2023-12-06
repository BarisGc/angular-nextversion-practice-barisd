import { Injectable } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Data,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  setTitle() {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      switchMap(() => this.getChildData()),
      tap((title) => this.titleService.setTitle(title))
    );
  }

  getChildData(): Observable<any> {
    return this.getChild(this.route).data.pipe(
      map((data) => `E-Book Module - ${data['title']}`)
    );
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getChild(route.firstChild) : route;
  }
}
