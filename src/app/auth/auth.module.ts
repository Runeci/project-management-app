import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthPageComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [LoginComponent, SignupComponent, AuthPageComponent],
})
export class AuthModule {}
