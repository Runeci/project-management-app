import { Component, Input, OnInit } from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { TaskI } from '@shared/models/tasks.interfaces';
import { TaskApiService } from '@boards/services/task-api.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';

@Component({
  selector: 'app-column-task',
  templateUrl: './column-task.component.html',
  styleUrls: ['./column-task.component.scss'],
  animations: [
    trigger('hovered', [
      state('start', style({
        visibility: 'hidden',
      })),
      state('end', style({
        visibility: 'visible',
      })),
      transition('start <=> end', animate('0s ease-out')),
    ]),
  ],
})
export class ColumnTaskComponent implements OnInit {
  @Input() task!: TaskI;

  @Input() column!: Column;

  private boardId: Board['id'];

  constructor(private tasksApiService: TaskApiService,
              private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
  }

  public animationStatus: string = 'start';

  public startAnimation(): void {
    this.animationStatus = 'end';
  }

  public stopAnimation(): void {
    this.animationStatus = 'start';
  }

  public deleteTask(taskId: TaskI['id']) {
    this.tasksApiService
      .deleteTask(this.boardId, this.column.id, taskId).subscribe();
  }
}
