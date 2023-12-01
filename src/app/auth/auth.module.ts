import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './containers';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LoginFormComponent } from './components/login-form.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog.component';
export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  declarations: [COMPONENTS],
})
export class AuthModule {}
