import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Link } from '../models/links';
import { Store } from '@ngrx/store';
import { EBook } from '@example-app/features/e-books/models/e-book.model';
import { Observable, filter, shareReplay, tap } from 'rxjs';
import * as fromEBooks from '@example-app/features/e-books/reducers';
import { NavigationEnd, NavigationStart, Route, Router } from '@angular/router';
import { ViewEBookPageActions } from '@example-app/features/e-books/actions/view-e-book-page.actions';
import { NavigationTab } from '@example-app/features/e-books/models/e-book-navigation-tab';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit, OnChanges {
  // #navigationTabs
  @Input() navigationTabs: NavigationTab[] = [];
  @Input() activeLink = 'stored';
  selectedEBook$!: Observable<EBook>;
  previousUrl: string = '';
  currentUrl: string = '';
  ebookViewDetailLink = '';

  // #cycleorder #cycle #order
  constructor(private store: Store, private router: Router) {
    console.log('constructor');
    this.getInitialStore(store);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    // this.trackUrlForTabActivation();
  }

  getInitialStore(store: Store) {
    this.selectedEBook$ = store.select(
      fromEBooks.selectSelectedEBook
    ) as Observable<EBook>;
  }

  // trackUrlForTabActivation() {
  //   this.router.events
  //     .pipe(filter((x): x is NavigationEnd => x instanceof NavigationEnd))
  //     .subscribe((evnt: any) => {
  //       this.previousUrl = this.currentUrl;
  //       if (this.fixedTabsLinks.some((link) => link.url.includes('view'))) {
  //         this.fixedTabsLinks[
  //           this.fixedTabsLinks.findIndex((link) => link.url.includes('view'))
  //         ].disabled = false;
  //         this.store.dispatch(ViewEBookPageActions.unselectEBook());
  //       }
  //       this.currentUrl = evnt.url;
  //       this.activeLink = evnt.url.split('/').slice(2, 3).join();
  //     });
  // }

  ngOnDestroy() {
    // TODO: manage selectedEBook unsubscription
  }
}
