import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from './app.constants';
import { WelcomePageComponent } from './core/pages/welcome/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: Path.homePage, pathMatch: 'full' },
  {
    path: Path.homePage,
    component: WelcomePageComponent,
  },
  {
    path: Path.authPage,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
