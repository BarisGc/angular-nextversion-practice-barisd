import { Component, Input } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { AuthService } from '../../auth/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container fullscreen (backdropClick)="closeSidenav()">
      <mat-sidenav
        #sidenav
        [opened]="showSidenav"
        (keydown.escape)="closeSidenav()"
      >
        <mat-nav-list>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="admin-dash"
            icon="admin_panel_settings"
            hint1="Not implemented"
          >
            Admin Dash
          </app-nav-item>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="user-dash"
            icon="dashboard"
            hint1="Not implemented"
          >
            User Dash
          </app-nav-item>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="e-books"
            icon="library_books"
          >
            E-Books
          </app-nav-item>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="product"
            icon="shopping_cart"
          >
            Product
          </app-nav-item>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="commits"
            icon="commit"
            hint1="Popular Navigation Methods:"
            hint2="Pagination, Infinite, Load More"
            >Commits
          </app-nav-item>
          <app-nav-item
            *ngIf="!loggedIn"
            (navigate)="closeSidenav()"
            icon="account_circle"
          >
            Sign In
          </app-nav-item>
          <app-nav-item
            *ngIf="loggedIn"
            (navigate)="logout()"
            icon="exit_to_app"
          >
            Sign Out
          </app-nav-item>
        </mat-nav-list>
      </mat-sidenav>
      <app-toolbar (openMenu)="openSidenav()"
        ><span
          [ngStyle]="{ marginLeft: '1rem', cursor: 'pointer' }"
          routerLink="/"
          >Angular Next Practices</span
        ></app-toolbar
      >
      <div class="spinner-container" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.03);
      }
      mat-sidenav {
        width: 300px;
      }
      .spinner-container {
        display: flex;
        justify-content: center;
        margin-top: 5rem;
      }
    `,
  ],
})
export class LayoutComponent {
  @Input() loading = false;
  @Input() showSidenav = false;
  @Input() loggedIn = false;

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService
  ) {}

  closeSidenav() {
    this.layoutService.setSidenav(false);
  }

  openSidenav() {
    this.layoutService.setSidenav(true);
  }

  logout() {
    this.authService.logoutConfirmation().pipe(take(1)).subscribe();
  }
}
