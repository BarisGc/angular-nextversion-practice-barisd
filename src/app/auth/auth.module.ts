import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import {
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
} from './components';
import { LoginPageComponent } from './containers';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
