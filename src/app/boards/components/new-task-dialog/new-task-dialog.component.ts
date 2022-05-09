import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskApiService } from '@boards/services/task-api.service';
import { Column } from '@shared/models/columns.interfaces';
import { Board } from '@shared/models/boards.interfaces';

@Component({
  selector: 'app-new-task-boards-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss'],
})
export class NewTaskDialogComponent {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private tasksApiService: TaskApiService,
    private dialogService: BoardDialogService,
    @Inject(MAT_DIALOG_DATA) private data: { taskOrder: number, columnId: Column['id'], boardId: Board['id'] },
  ) {
  }

  public onSubmit() {
    this.tasksApiService.createTask(
      this.data.boardId,
      this.data.columnId,
      {
        title: this.form.value.title,
        description: this.form.value.description,
        userId: '7f191f6d-a5ac-44a2-a68a-e7eecbe2b3ce',
        order: this.data.taskOrder,
        done: false,
      },
    ).subscribe();
  }
}
