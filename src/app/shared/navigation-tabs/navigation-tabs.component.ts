import { EBookCollectionService } from './../../features/e-books/services/e-book-collection.service';
import { EBookNavigationService } from './../../features/e-books/services/e-book-navigation.service';
import { Observable, Subscription, filter, map, switchMap, tap } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  Event,
} from '@angular/router';
import { NavigationTab } from '../../features/e-books/models/e-book-navigation-tab';
import { EBook } from '../../features/e-books/models/e-book.model';
import { EBookDataService } from '../../features/e-books/services/e-book-data.service';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit, OnChanges {
  // #navigationTabs
  activeLink = 'stored';
  navigationTabs!: NavigationTab[];

  selectedEBook$!: Observable<EBook | null>;
  previousUrl: string = '';
  currentUrl: string = '';
  ebookViewDetailLink = '';

  masterSubscription = new Subscription();

  // #cycleorder #cycle #order
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eBookDataService: EBookDataService,
    private eBookNavigationService: EBookNavigationService
  ) {
    // console.log('constructor'); order:1
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges'); order:2
  }

  ngOnInit(): void {
    // console.log('ngOnInit'); order:3
    this.getInitialState();
    this.eventChecker();
  }
  eventChecker(): void {
    this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent
        ),
        filter((e) => e instanceof NavigationEnd),
        tap(() => console.log('url', this.router.url))
      )
      .subscribe();
  }
  getInitialState() {
    this.getSelectedEBooks();
    this.getNavigationTabs();
  }

  getSelectedEBooks() {
    this.selectedEBook$ = this.eBookDataService.selectedEBook$;
  }

  getNavigationTabs() {
    const navigationTabsStream = this.eBookNavigationService.navigationTabs$
      .pipe(tap((tabs) => (this.navigationTabs = tabs)))
      .subscribe();

    this.masterSubscription.add(navigationTabsStream);
  }

  ngOnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}
