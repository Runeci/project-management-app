import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TaskI } from '@shared/models/tasks.interfaces';
import { TaskApiService } from '@boards/services/task-api.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '@boards/components/task-edit-dialog/task-edit-dialog.component';
import { UserApiService } from '@core/services/user/user-api.service';
import { UserInfo } from '@shared/models/user.interfaces';

@Component({
  selector: 'app-column-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
  animations: [
    trigger('hovered', [
      state(
        'start',
        style({
          visibility: 'hidden',
        })
      ),
      state(
        'end',
        style({
          visibility: 'visible',
        })
      ),
      transition('start <=> end', animate('0s ease-out')),
    ]),
  ],
})
export class BoardTaskComponent implements OnInit {
  @Input() task!: TaskI;

  @Input() column!: Column;

  @Output() deletedTask = new EventEmitter<Pick<TaskI, 'id' | 'order'>>();

  private boardId: Board['id'];
  userName!: string[];

  constructor(
    private tasksApiService: TaskApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  public ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];

    this.userApiService.getAllUsers().subscribe((res) => {
      this.userName = res
        .filter((user) => user.id === this.task.userId)
        .map((user: UserInfo) => user.name);
    });
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
    this.deletedTask.emit({
      id: this.task.id,
      order: this.task.order,
    });
  }

  public openTaskEditDialog() {
    const ref = this.dialog.open(TaskEditDialogComponent, {
      data: {
        task: this.task,
        columnId: this.column.id,
        boardId: this.boardId,
        taskFiles: this.task.files,
        userName: this.userName,
      },
      width: '500px',
    });

    ref.afterClosed().subscribe((res) => {
      if (typeof res === 'undefined') {
        return;
      }
      const { title } = res;
      const { description } = res;

      this.tasksApiService
        .updateTask(this.boardId, this.column.id, this.task.id, {
          title,
          order: this.task.order,
          description,
          userId: this.task.userId,
          boardId: this.boardId,
          columnId: this.task.columnId,
          done: false,
        })
        .subscribe();
      this.task.title = res.title;
      this.task.description = res.description;
    });
  }
}
