import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Credentials } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = {
    userSub: new BehaviorSubject<Credentials | null>(null),
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
    const credentials = JSON.parse(localStorage.getItem('credentials')!);
    if (credentials) this.authState.userSub.next(credentials);
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

    this.loginSuccess({ username, password });
  }

  loginPending(isPending: boolean) {
    this.authState.pendingSub.next(isPending);
  }

  loginSuccess(credentials: Credentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
    this.authState.userSub.next(credentials);
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
    localStorage.removeItem('credentials');
  }

  logoutConfirmation() {
    const dialogRef = this.dialog.open<
      LogoutConfirmationDialogComponent,
      undefined,
      boolean
    >(LogoutConfirmationDialogComponent);

    const decision = dialogRef.afterClosed();
    decision ? this.logout() : this.logoutConfirmationDismiss();
  }

  logoutConfirmationDismiss() {
    this.toastr.info('Logout Confirmation', 'Dismissed', {
      timeOut: 30000,
    });
  }
}
