import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { TaskApiService } from '@boards/services/task-api.service';

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
      title: [`${this.task.title}`],
      description: [`${this.task.description}` || ''],
    },
  );

  constructor(
    private fb: FormBuilder,
    private tasksApiService: TaskApiService,
    @Inject(MAT_DIALOG_DATA) public task: TaskI,
  ) {
  }

  public updateTask() {
    const description = this.editTaskForm.value.description
      ? this.editTaskForm.value.description : this.task.description;

    const title = this.editTaskForm.value.title
      ? this.editTaskForm.value.title : this.task.title;
    this.tasksApiService.updateTask(
      this.task.boardId,
      this.task.columnId!,
      this.task.id,
      {
        title,
        order: this.task.order,
        description,
        userId: this.task.userId,
        boardId: this.task.boardId,
        columnId: this.task.columnId,
      },
    ).subscribe();

    this.task.title = title;
    this.task.description = description;
  }
}
