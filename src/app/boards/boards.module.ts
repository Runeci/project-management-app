import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { AddNewBoardComponent } from './components/add-new-board/add-new-board.component';


@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPreviewComponent,
    AddNewBoardComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
  ],
  exports: [
    BoardsPageComponent,
  ]
})
export class BoardsModule { }
