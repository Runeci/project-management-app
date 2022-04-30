import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from '../app.constants';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: Path.signupPage, component: SignupComponent },
      { path: Path.loginPage, component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
