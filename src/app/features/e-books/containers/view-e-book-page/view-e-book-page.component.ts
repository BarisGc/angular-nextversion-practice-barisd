import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ViewEBookPageActions } from '../../actions/view-e-book-page.actions';
import { EBookNavigationTabActions } from '../../actions/e-book-navigation-tab-actions';
import { NavigationTab } from '../../models/e-book-navigation-tab';
import * as fromEBooks from '@example-app/features/e-books/reducers';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'app-view-e-book-page',
  templateUrl: './view-e-book-page.component.html',
  styleUrls: ['./view-e-book-page.component.scss'],
})
export class ViewEBookPageComponent {
  params = this.route.snapshot.params;
  tab: NavigationTab = {
    name: `view/${this.params['id']}`,
    url: `view/${this.params['id']}`,
    isShown: true,
    isDisabled: true,
    isActive: true,
  };

  constructor(private store: Store, private route: ActivatedRoute) {
    route.params
      .pipe(
        map((params) => {
          const tab = this.tab;
          const actions = [
            ViewEBookPageActions.selectEBook({ id: params['id'] }),
            EBookNavigationTabActions.addTab({
              tab,
            }),
          ];

          return actions;
        })
      )
      .subscribe((actions) => {
        actions.forEach((action) => {
          store.dispatch(action);
        });
      });
  }

  ngOnDestroy() {
    const tab = this.tab;
    this.store
      .select(fromEBooks.isSelectedEBookInCollection)
      .subscribe((isSelectedEBookInCollection) => {
        if (!isSelectedEBookInCollection) {
          this.store.dispatch(
            EBookNavigationTabActions.removeTab({
              tab: {
                ...tab,
                isDisabled: false,
              },
            })
          );
        }
        if (isSelectedEBookInCollection) {
          this.store.dispatch(
            EBookNavigationTabActions.updateTab({
              tab: {
                ...tab,
                isDisabled: false,
              },
            })
          );
        }
      });
  }
}
// router.events.subscribe((event) => {
//   let urlParam = '';

//   if (event instanceof NavigationStart) {
//     ViewEBookPageActions.selectEBook({
//       id: urlParam[0],
//     });
//     EBookNavigationTabActions.addTab({
//       tab,
//     });
//   } else if (event instanceof NavigationEnd) {
//     EBookNavigationTabActions.removeTab({
//       tab,
//     });
//   }
// });
