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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
