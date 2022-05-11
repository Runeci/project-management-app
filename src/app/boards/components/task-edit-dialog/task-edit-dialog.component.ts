import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { TaskApiService } from '@boards/services/task-api.service';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';

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

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    private fb: FormBuilder,
    private tasksApiService: TaskApiService,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskI, columnId: Column['id'], boardId: Board['id'] },
  ) {
  }

  // public updateTask() {
  //   const description = this.editTaskForm.value.description
  //     ? this.editTaskForm.value.description : this.data.task.description;
  //
  //   const title = this.editTaskForm.value.title
  //     ? this.editTaskForm.value.title : this.data.task.title;
  //   this.tasksApiService.updateTask(
  //     this.data.boardId,
  //     this.data.columnId,
  //     this.data.task.id,
  //     {
  //       title,
  //       order: this.data.task.order,
  //       description,
  //       userId: this.data.task.userId,
  //       boardId: this.data.boardId,
  //       columnId: this.data.task.columnId,
  //       done: false,
  //     },
  //   ).subscribe();
  //
  //   this.data.task.title = title;
  //   this.data.task.description = description;
  // }

  public onSubmit() {
    this.dialogRef.close({
      title: this.editTaskForm.value.title,
      description: this.editTaskForm.value.description,
    });
  }
}
