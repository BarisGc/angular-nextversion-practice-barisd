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
  host: { 'data-testid': 'login-page' },
})
export class LoginPageComponent implements OnInit {
  pending$: Observable<boolean> = of(false);
  error$: Observable<string> = of('');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin() {
    this.pending$ = this.authService.pending$;
    this.error$ = this.authService.error$;
  }
  onSubmit(credentials: Credentials) {
    this.authService.login(credentials);
  }
}
