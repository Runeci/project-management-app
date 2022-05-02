import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { AddNewBoardComponent } from './components/add-new-board/add-new-board.component';
import { NewBoardDialogComponent } from './components/new-board-dialog/new-board-dialog.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddNewColumnComponent } from './components/add-new-column/add-new-column.component';
import { MatExpansionModule } from '@angular/material/expansion';
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
  ],
  exports: [
    BoardsPageComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BoardsModule { }
