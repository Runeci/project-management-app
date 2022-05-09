import { Component, Input, OnInit } from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { TaskI } from '@shared/models/tasks.interfaces';
import { TaskApiService } from '@boards/services/task-api.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '@boards/components/task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-column-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
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
export class BoardTaskComponent implements OnInit {
  @Input() task!: TaskI;

  @Input() column!: Column;

  private boardId: Board['id'];

  constructor(
    private tasksApiService: TaskApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
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

  public deleteTask(event: Event) {
    event.stopPropagation();
    // console.log('fk', this.task, this.column);
    // console.log(this.column.id, 'wfk');

    this.tasksApiService
      .deleteTask(this.boardId, this.column.id, this.task.id).subscribe();
  }

  public openTaskEditDialog() {
    this.dialog.open(
      TaskEditDialogComponent,
      {
        data: this.task,
        width: '500px',
      },
    );
  }
}
