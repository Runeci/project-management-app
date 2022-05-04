import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { TaskApiService } from '@boards/services/task-api.service';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent {
  public editDescription = false;

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
  ) { }
}
