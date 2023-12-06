import { Routes } from '@angular/router';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductDetailsPageComponent } from './containers/product-details-page/product-details-page.component';
import { ProductListPageComponent } from './containers/product-list-page/product-list-page.component';
export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ProductListPageComponent,
        title: 'Product List',
      },
      {
        path: ':id',
        component: ProductDetailsPageComponent,
        title: 'Product Details',
      },
    ],
  },
];
