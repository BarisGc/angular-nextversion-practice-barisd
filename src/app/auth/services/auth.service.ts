import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  exhaustMap,
  map,
  of,
  throwError,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Credentials, User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = {
    userSub: new BehaviorSubject<User | null>(null),
    pendingSub: new BehaviorSubject<boolean>(false),
    errorSub: new BehaviorSubject<string>(''),
  };

  user$ = this.authState.userSub.asObservable();
  pending$ = this.authState.pendingSub.asObservable();
  error$ = this.authState.errorSub.asObservable();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.checkUserAccess();
  }

  checkUserAccess() {
    // TODO: Better to use jwt & don't use password for access check
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) this.authState.userSub.next(user);
  }

  login({ username, password }: Credentials) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    this.loginPending(true);

    if (username !== 'ngrx' || password !== 'Password10') {
      this.loginFailure('Invalid username or password');
    }

    const randomToken =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2);

    this.loginSuccess({ name: username, token: randomToken });
  }

  loginPending(isPending: boolean) {
    this.authState.pendingSub.next(isPending);
  }

  loginSuccess(user: User) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: user.name,
        token: user.token,
      })
    );
    this.authState.userSub.next(user);
    this.router.navigate(['/']);

    this.loginPending(false);
  }

  loginFailure(error: string) {
    this.authState.errorSub.next(error);

    this.loginPending(false);
  }

  loginRedirect() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authState.userSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  logoutConfirmation() {
    return of(true).pipe(
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);
        return dialogRef.afterClosed();
      }),
      map((decision) =>
        decision ? this.logout() : this.logoutConfirmationDismiss()
      )
    );
  }

  logoutConfirmationDismiss() {
    this.toastr.info('Logout Confirmation', 'Dismissed');
  }
}
