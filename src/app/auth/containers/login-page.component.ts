import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/user';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="(pending$ | async)!"
      [errorMessage]="error$ | async"
    >
    </app-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$: Observable<boolean> = of(false);
  error$: Observable<string> = of('');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin() {
    this.pending$ = this.authService.authState.pending.asObservable();
    this.error$ = this.authService.authState.error.asObservable();
  }
  onSubmit(credentials: Credentials) {
    this.authService.login(credentials);
  }
}
