import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';
import { UserInfo } from '@shared/models/user.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-edit-boards-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent {
  public editDescription = false;

  public editTitle = false;

  public editTaskForm = this.fb.group(
    {
      title: [`${this.data.task.title}`],
      description: [`${this.data.task.description}` || ''],
    },
  );

  public user$: Observable<UserInfo> | undefined;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskI, columnId: Column['id'], boardId: Board['id'], userName: string },
  ) {}

  public onSubmit() {
    this.dialogRef.close({
      title: this.editTaskForm.value.title,
      description: this.editTaskForm.value.description,
    });
  }
}
