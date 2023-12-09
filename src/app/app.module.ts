import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './core/containers';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  imports: [
    // TODO: is commonmodule necessary? check if you can delete all commonmodules
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 5000,
      // 30000ms for debug
      extendedTimeOut: 2000,
      // 30000ms for debug
    }), // ToastrModule added
    CoreModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/angular-next',
    },
  ],
  bootstrap: [AppComponent],
  declarations: [],
})
export class AppModule {}
