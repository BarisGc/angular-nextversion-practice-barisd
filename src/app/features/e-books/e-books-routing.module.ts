import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EBookCollectionPageComponent } from './containers/e-book-collection-page/e-book-collection-page.component';
import { FindEBookPageComponent } from './containers/find-e-book-page/find-e-book-page.component';
import { ViewEBookPageComponent } from './containers/view-e-book-page/view-e-book-page.component';
import { StoredEBooksPageComponent } from './containers/stored-e-books-page/stored-e-books-page.component';
import { EBooksPageComponent } from './containers/e-books-page/e-books-page.component';

const routes: Routes = [
  {
    path: '',
    component: EBooksPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'stored',
        pathMatch: 'full',
      },
      {
        path: 'stored',
        component: StoredEBooksPageComponent,
        data: { title: 'Stored E-Books' },
      },
      {
        path: 'find',
        component: FindEBookPageComponent,
        data: { title: 'Find E-Book' },
      },
      {
        path: 'collection',
        component: EBookCollectionPageComponent,
        data: { title: 'Collected E-Books' },
      },
      {
        path: 'view/:id',
        component: ViewEBookPageComponent,
        data: { title: 'E-Book Details' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EBooksRoutingModule {
  components = [EBooksPageComponent];
}
