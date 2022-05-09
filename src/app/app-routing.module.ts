import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { WelcomePageComponent } from '@core/pages/welcome/welcome-page.component';
import { Path } from './app.constants';

const routes: Routes = [
  { path: '', redirectTo: Path.boardsPage, pathMatch: 'full' },
  {
    path: Path.homePage,
    component: WelcomePageComponent,
  },
  {
    path: Path.authPage,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: Path.boardsPage,
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
