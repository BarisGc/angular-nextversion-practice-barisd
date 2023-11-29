import { NgModule } from '@angular/core';

import { EBookAuthorsComponent } from './components/e-book-authors/e-book-authors.component';
import { EBookDetailComponent } from './components/e-book-detail/e-book-detail.component';
import { EBookPreviewListComponent } from './components/e-book-preview-list/e-book-preview-list.component';
import { EBookPreviewComponent } from './components/e-book-preview/e-book-preview.component';
import { EBookSearchComponent } from './components/e-book-search/e-book-search.component';
import { EBookCollectionPageComponent } from './containers/e-book-collection-page/e-book-collection-page.component';
import { EBooksRoutingModule } from './e-books-routing.module';
import { SelectedEBookComponent } from './containers/selected-e-book/selected-e-book.component';
import { FindEBookPageComponent } from './containers/find-e-book-page/find-e-book-page.component';
import { ViewEBookPageComponent } from './containers/view-e-book-page/view-e-book-page.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { EBookEffects } from './effects/e-book.effects';
import { CollectionEffects } from './effects/collection.effects';

import * as fromEBooksPage from './reducers';
import { StoredEBooksPageComponent } from './containers/stored-e-books-page/stored-e-books-page.component';
import { EBookCollectionTableComponent } from './components/e-book-collection-table/e-book-collection-table.component';
import { EBookCollectionItemComponent } from './components/e-book-collection-item/e-book-collection-item.component';
import { EBooksPageComponent } from './containers/e-books-page/e-books-page.component';

export const COMPONENTS = [
  SelectedEBookComponent,
  EBookAuthorsComponent,
  EBookDetailComponent,
  EBookPreviewListComponent,
  EBookPreviewComponent,
  EBookSearchComponent,
  EBookCollectionTableComponent,
  EBookCollectionItemComponent,
];

export const CONTAINERS = [
  EBooksPageComponent,
  EBookCollectionPageComponent,
  FindEBookPageComponent,
  ViewEBookPageComponent,
  StoredEBooksPageComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    SharedModule,
    EBooksRoutingModule,
    NavigationTabsModule,
    PipesModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(
      fromEBooksPage.eBooksPageFeatureKey,
      fromEBooksPage.reducers
    ),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature(EBookEffects, CollectionEffects),
  ],
})
export class EBooksModule {}
