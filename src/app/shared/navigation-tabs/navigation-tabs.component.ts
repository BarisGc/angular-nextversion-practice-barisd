import { Observable, Subscription, filter, tap } from 'rxjs';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  Event,
  RouterModule,
} from '@angular/router';
import { EBook } from '../../features/e-books/models/e-book.model';
import { EBookDataService } from '../../features/e-books/services/e-book-data.service';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared.module';
import { NavigationTabsService } from '../services/navigation-tabs.service';
import { NavigationTab } from '../models/navigation-tab';

const MODULES = [SharedModule, MaterialModule, RouterModule];
@Component({
  selector: 'app-navigation-tabs',
  standalone: true, // Note: Hybrid Usage(Standalone + Module) for practicing intentions
  imports: [...MODULES],
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit, OnChanges {
  // #navigationTabs
  activeLink = '';
  navigationTabs!: NavigationTab[];

  // TODO: DELETE selectedEBook implementation
  selectedEBook$!: Observable<EBook | null>;

  masterSubscription = new Subscription();

  // #cycleorder #cycle #order
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eBookDataService: EBookDataService,
    private navigationTabsService: NavigationTabsService
  ) {
    // console.log('constructor'); order:1
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges'); order:2
  }

  ngOnInit(): void {
    // console.log('ngOnInit'); order:3
    this.getInitialState();
    // this.eventChecker(); for practicing
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
    const navigationTabsStream = this.navigationTabsService.navigationTabs$
      .pipe(tap((tabs) => (this.navigationTabs = tabs)))
      .subscribe();

    this.masterSubscription.add(navigationTabsStream);
  }

  ngOnDestroy() {
    this.masterSubscription.unsubscribe();
  }
}
