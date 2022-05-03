import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { AddNewBoardComponent } from './components/add-new-board/add-new-board.component';
import { NewBoardDialogComponent } from './components/new-board-dialog/new-board-dialog.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { AddNewColumnComponent } from './components/add-new-column/add-new-column.component';
import { ColumnTaskComponent } from './components/column-task/column-task.component';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPreviewComponent,
    AddNewBoardComponent,
    NewBoardDialogComponent,
    BoardPageComponent,
    BoardColumnComponent,
    AddNewColumnComponent,
    ColumnTaskComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    BoardsPageComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BoardsModule { }
