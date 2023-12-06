import { NgModule } from '@angular/core';
import { NavigationTabsModule } from '../../shared/navigation-tabs/navigation-tabs.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { EBookAuthorsComponent } from './components/e-book-authors/e-book-authors.component';
import { EBookCollectionItemComponent } from './components/e-book-collection-item/e-book-collection-item.component';
import { EBookCollectionTableComponent } from './components/e-book-collection-table/e-book-collection-table.component';
import { EBookDetailComponent } from './components/e-book-detail/e-book-detail.component';
import { EBookPreviewListComponent } from './components/e-book-preview-list/e-book-preview-list.component';
import { EBookPreviewComponent } from './components/e-book-preview/e-book-preview.component';
import { EBookSearchComponent } from './components/e-book-search/e-book-search.component';
import { EBookCollectionPageComponent } from './containers/e-book-collection-page/e-book-collection-page.component';
import { EBooksPageComponent } from './containers/e-books-page/e-books-page.component';
import { FindEBookPageComponent } from './containers/find-e-book-page/find-e-book-page.component';
import { SelectedEBookComponent } from './containers/selected-e-book/selected-e-book.component';
import { StoredEBooksPageComponent } from './containers/stored-e-books-page/stored-e-books-page.component';
import { ViewEBookPageComponent } from './containers/view-e-book-page/view-e-book-page.component';
import { EBooksRoutingModule } from './e-books-routing.module';
import { MaterialModule } from '../../material/material.module';
import { NgOptimizedImage } from '@angular/common';

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
    MaterialModule,
    NgOptimizedImage,
  ],
})
export class EBooksModule {}
