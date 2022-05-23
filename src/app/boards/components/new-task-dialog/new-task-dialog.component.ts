import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    private fb: FormBuilder,
    private tasksApiService: TaskApiService,
    private dialogService: BoardDialogService,
    @Inject(MAT_DIALOG_DATA) private data: { taskOrder: number, columnId: Column['id'], boardId: Board['id'] },
  ) {
  }

  public onSubmit() {
    this.dialogRef.close({
      title: this.form.value.title,
      description: this.form.value.description,
    });
  }
}
