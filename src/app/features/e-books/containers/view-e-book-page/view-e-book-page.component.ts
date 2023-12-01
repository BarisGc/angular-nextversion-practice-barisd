import { EBookCollectionService } from '../../services/e-book-collection-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, tap, switchMap } from 'rxjs';
import { NavigationTab } from '../../models/e-book-navigation-tab';
import { EBookDataService } from '../../services/e-book-data.service';
import { EBookNavigationService } from '../../services/e-book-navigation.service';
import { EBook } from '../../models/e-book.model';
@Component({
  selector: 'app-view-e-book-page',
  templateUrl: './view-e-book-page.component.html',
  styleUrls: ['./view-e-book-page.component.scss'],
})
export class ViewEBookPageComponent {
  params = this.route.snapshot.params;
  dynamicTab: NavigationTab = {
    name: `view/${this.params['id']}`,
    url: `view/${this.params['id']}`,
    isShown: true,
    isDisabled: true,
    isActive: true,
  };

  constructor(
    private route: ActivatedRoute,
    private eBookDataService: EBookDataService,
    private eBookNavigationService: EBookNavigationService,
    private eBookCollectionService: EBookCollectionService
  ) {}

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.route.params
      .pipe(
        tap((params) => {
          this.eBookDataService.selectEBook(params['id']);
          this.eBookNavigationService.addTab(this.dynamicTab);
        })
      )
      .subscribe();
  }

  setDynamicTabs() {
    const collectedEBooks$ = this.eBookCollectionService.collectedEBooks$;
    const selectedEBook$ = this.eBookDataService.selectedEBook$;

    const isSelectedEBookInCollection$ = selectedEBook$.pipe(
      switchMap((selectedEBook) =>
        collectedEBooks$.pipe(
          map((collectedEBooks) =>
            collectedEBooks.some(
              (collectedEBook) => collectedEBook.id === selectedEBook?.id
            )
          )
        )
      )
    );

    // TODO: check if the subscription covers other two inner obs
    isSelectedEBookInCollection$
      .pipe(
        tap((isCollected) => {
          if (!isCollected) {
            this.eBookNavigationService.removeTab(this.dynamicTab);
            // TODO: check if this ends tap execution
            return;
          }

          this.eBookNavigationService.updateTab({
            ...this.dynamicTab,
            isDisabled: false,
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.setDynamicTabs();
  }
}
