import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { AddNewBoardComponent } from './components/add-new-board/add-new-board.component';
import { NewBoardDialogComponent } from './components/new-board-dialog/new-board-dialog.component';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPreviewComponent,
    AddNewBoardComponent,
    NewBoardDialogComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BoardsPageComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BoardsModule { }
