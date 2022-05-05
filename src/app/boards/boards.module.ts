import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { ColumnTaskComponent } from './components/column-task/column-task.component';
import { TaskEditDialogComponent } from './components/task-edit-dialog/task-edit-dialog.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPreviewComponent,
    DialogComponent,
    BoardPageComponent,
    BoardColumnComponent,
    ColumnTaskComponent,
    TaskEditDialogComponent,
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
