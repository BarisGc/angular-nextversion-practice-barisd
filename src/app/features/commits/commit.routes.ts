import { Routes } from '@angular/router';
import { CommitTableWithPaginationComponent } from './containers/commit-table-with-pagination/commit-table-with-pagination.component';
import { CommitInfiniteScrollComponent } from './containers/commit-infinite-scroll/commit-infinite-scroll.component';
import { CommitLoadMoreComponent } from './containers/commit-load-more/commit-load-more.component';
import { CommitTableWithVirtualScrollComponent } from './containers/commit-table-with-virtual-scroll/commit-table-with-virtual-scroll.component';
import { CommitPageComponent } from './containers/commit-page/commit-page.component';
// TODO: Refactor import segments like @exampleapp/....  for clean code
export const COMMIT_ROUTES: Routes = [
  {
    path: '',
    component: CommitPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'load-more',
        pathMatch: 'full',
      },
      {
        path: 'table-with-pagination',
        component: CommitTableWithPaginationComponent,
        title: 'Table with Pagination',
      },
      {
        path: 'infinite-scroll',
        component: CommitInfiniteScrollComponent,
        title: 'Infinite Scroll',
      },
      {
        path: 'load-more',
        component: CommitLoadMoreComponent,
        title: 'Load More',
      },
      {
        path: 'table-with-virtual-scroll',
        component: CommitTableWithVirtualScrollComponent,
        title: 'Product Details',
      },
    ],
  },
];
