import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from '@core/pages/welcome/welcome-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPageComponent } from '@boards/pages/board-page/board-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BoardsPageComponent },
  { path: ':id', component: BoardPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {
}
