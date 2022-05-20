import { Component, OnInit } from '@angular/core';
import { TaskI } from '@shared/models/tasks.interfaces';
import { BoardsApiService } from '@boards/services/boards-api.service';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import {
  forkJoin, map, switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '@boards/components/task-edit-dialog/task-edit-dialog.component';
import { TaskApiService } from '@boards/services/task-api.service';
import { UserInfo } from '@shared/models/user.interfaces';
import { UserApiService } from '@core/services/user/user-api.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
  public searchValue: string = '';

  public allTasks!: TaskI[];

  public foundTasks: TaskI[] = [];

  private users: UserInfo[] = [];

  userName!: string[];

  constructor(
    private boardsApiService: BoardsApiService,
    private taskApiService: TaskApiService,
    private columnApiService: ColumnsApiService,
    private userApiService: UserApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit() {
    this.getTasks();
    this.userApiService.getAllUsers().subscribe(
      (r) => {
        this.users = r;
      },
    );
  }

  public getTasks() {
    if (this.allTasks?.length) {
      return;
    }

    this.boardsApiService.getBoards()
      .pipe(
        switchMap((boards) => forkJoin(boards
          .map((board) => this.boardsApiService.getBoard(board.id)
            .pipe(
              map((currBoard) => currBoard.columns!
                .map((column) => { column.tasks
                  .map((task) => ({ ...task, boardId: board.id, columnId: column.id}))
                })),
            )))),
        map((tasks) => tasks.flat(2)),
      ).subscribe(
      (result) => {
        // @ts-ignore
        this.allTasks = result;
      },
    );
  }

  public searchTask(searchValue: string): void {
    if (!searchValue) {
      this.foundTasks = [];
      return;
    }

    searchValue = searchValue.toLowerCase().trim();
    const userIds = this.users
      ?.filter((item) => item.name.includes(searchValue)).map((user) => user.id);

    this.foundTasks = this.allTasks
      .filter((item) => item?.title.includes(searchValue)
        || item?.description?.includes(searchValue)
        || userIds.some((id) => id === item.userId));
  }

  public goToTask(task: TaskI) {
    if (task.boardId) {
      this.router.navigate(['/boards', task.boardId]);
    }

    const userName = this.users.filter((user) => user.id === task.userId)
      .map((user: UserInfo) => user.name);

    console.log(task.columnId, task, this.allTasks);

    const dialogRef = this.dialog.open(
      TaskEditDialogComponent,
      {
        data: {
          task,
          columnId: task.columnId,
          boardId: task.boardId,
          taskFiles: task.files,
          userName: userName,
        },
        width: '500px',
      },
    );

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (typeof res === 'undefined') {
          return;
        }
        let columnId: string;
        if (task.columnId) {
          columnId = task.columnId;
          this.taskApiService.updateTask(task.boardId, columnId, task.id, {
            title: res.title,
            order: task.order,
            description: res.description,
            userId: task.userId,
            boardId: task.boardId,
            columnId: task.columnId,
            done: false,
          }).subscribe();
        }
      },
    );
  }
}
