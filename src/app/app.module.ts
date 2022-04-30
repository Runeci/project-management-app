import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { INTERCEPTOR_PROVIDERS } from '@core/interceptors/providers';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule { }
