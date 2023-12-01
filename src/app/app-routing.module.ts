import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';
import { authGuard } from './auth/services/auth-guard.service';
import { LoginPageComponent } from './auth/containers';
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
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
