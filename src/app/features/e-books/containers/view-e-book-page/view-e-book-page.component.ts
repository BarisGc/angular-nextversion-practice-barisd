import { EBookCollectionService } from '../../services/e-book-collection.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, Subscription, Observable, of } from 'rxjs';
import { EBookDataService } from '../../services/e-book-data.service';
import { NavigationTab } from '../../../../shared/models/navigation-tab';
import { NavigationTabsService } from '../../../../shared/services/navigation-tabs.service';
import { EBook } from '../../models/e-book.model';
@Component({
  selector: 'app-view-e-book-page',
  templateUrl: './view-e-book-page.component.html',
  styleUrls: ['./view-e-book-page.component.scss'],
})
export class ViewEBookPageComponent {
  params = this.route.snapshot.params;
  viewTab: NavigationTab = {
    name: ``,
    url: `view/${this.params['id']}`,
    isShown: true,
    isDisabled: true,
    isActive: true,
  };

  selectedEBook$!: Observable<EBook | null>;

  masterSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private eBookDataService: EBookDataService,
    private navigationTabsService: NavigationTabsService,
    private eBookCollectionService: EBookCollectionService
  ) {}

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.enterPage();
  }

  enterPage() {
    const selectedEBookStream = this.eBookDataService.selectedEBook$
      .pipe(
        tap((book) => {
          const viewTabName = book
            ? book.volumeInfo.title + ' - ' + 'Collected!'
            : 'No Book Title';
          this.viewTab.name = viewTabName;
          this.selectedEBook$ = of(book);
        })
      )
      .subscribe();

    this.masterSubscription.add(selectedEBookStream);

    const routeStream = this.route.params
      .pipe(
        tap((params) => {
          this.eBookDataService.selectEBook(params['id']);
          this.navigationTabsService.addTabs([this.viewTab]);
        })
      )
      .subscribe();
    this.masterSubscription.add(routeStream);
  }

  setViewTab() {
    const collectedEBooks$ = this.eBookCollectionService.collectedEBooks$;
    const selectedEBook$ = this.eBookDataService.selectedEBook$;

    const isSelectedEBookInCollection$ = selectedEBook$.pipe(
      switchMap((selectedEBook) =>
        collectedEBooks$.pipe(
          map(
            (collectedEBooks) =>
              collectedEBooks?.some(
                (collectedEBook) => collectedEBook.id === selectedEBook?.id
              )
          )
        )
      )
    );

    // TODO: check if the subscription covers other two inner obs
    const stream2 = isSelectedEBookInCollection$
      .pipe(
        tap((isCollected) => {
          if (!isCollected) {
            this.navigationTabsService.removeTabs([this.viewTab]);
            // TODO: check if this ends tap execution
            return;
          }

          this.navigationTabsService.updateTab({
            ...this.viewTab,
            isDisabled: false,
          });
        })
      )
      .subscribe();
    this.masterSubscription.add(stream2);
  }

  ngOnDestroy() {
    this.setViewTab();
    this.masterSubscription.unsubscribe();
  }
}
