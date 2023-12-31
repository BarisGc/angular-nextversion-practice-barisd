import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';
import { authGuard } from './auth/services/auth-guard.service';
import { LoginPageComponent } from './auth/containers';
import { TemplatePageTitleStrategy } from './core/services/overriding-global/title-strategy.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/e-books',
    pathMatch: 'full',
  },
  {
    path: 'e-books',
    loadChildren: () =>
      import('./features/e-books/e-books.module').then((m) => m.EBooksModule),
    canActivate: [authGuard],
    canLoad: [authGuard],
    title: 'E-Books',
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./features/product/product.routes').then(
        (mod) => mod.PRODUCT_ROUTES
      ),
    canActivate: [authGuard],
    canLoad: [authGuard],
    title: 'Product',
  },
  {
    path: 'commits',
    loadChildren: () =>
      import('./features/commits/commit.routes').then(
        (mod) => mod.COMMIT_ROUTES
      ),
    canActivate: [authGuard],
    canLoad: [authGuard],
    title: 'Commits',
  },
  {
    path: 'various-libraries',
    loadChildren: () =>
      import('./features/various-libraries/various-libraries.routes').then(
        (mod) => mod.VARIOUS_LIBRARIES_ROUTES
      ),
    canActivate: [authGuard],
    canLoad: [authGuard],
    title: 'Various-libraries',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Not found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class AppRoutingModule {}
