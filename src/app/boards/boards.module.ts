import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { BoardsDialogComponent } from '@boards/components/boards-dialog/boards-dialog.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardTaskComponent } from './components/column-task/board-task.component';
import { TaskEditDialogComponent } from './components/task-edit-dialog/task-edit-dialog.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { NewColumnDialogComponent } from './components/new-column-dialog/new-column-dialog.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPreviewComponent,
    BoardsDialogComponent,
    BoardPageComponent,
    BoardColumnComponent,
    BoardTaskComponent,
    TaskEditDialogComponent,
    NewTaskDialogComponent,
    NewColumnDialogComponent,
    GlobalSearchComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    FileSaverModule,
  ],
  exports: [
    BoardsPageComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BoardsModule { }
