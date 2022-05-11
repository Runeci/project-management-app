import { Component } from '@angular/core';
import { TaskI } from '@shared/models/tasks.interfaces';
import { BoardsApiService } from '@boards/services/boards-api.service';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '@boards/components/task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
  public searchValue: string = '';

  public allTasks: TaskI[] = [];

  public foundTasks: TaskI[] = [];

  constructor(
    private boardsApiService: BoardsApiService,
    private columnApiService: ColumnsApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  public getTasks() {
    if (this.allTasks.length) {
      return;
    }
    this.boardsApiService.getBoards()
      .pipe(
        switchMap(
          (boards) => forkJoin(boards
            .map((board) => this.columnApiService.getColumns(board.id)
              .pipe(
                map((columnArr) => columnArr
                  .flat()
                  .map((col) => ({ ...col, boardId: board.id }))),
              ))),
        ),
        map((columnArr) => columnArr.flat()),
        switchMap((columnArr) => forkJoin(columnArr
          .map((column) => this.columnApiService.getColumn(column.boardId, column.id)
            .pipe(
              map((column1) => ({ ...column1, boardId: column.boardId })),
            )))),
        map((columnsArr) => columnsArr.map((column) => column.tasks
          .map((task) => ({ ...task, boardId: column.boardId, columnId: column.id })))),
        map((tasks) => tasks.flat()),
      ).subscribe((res) => this.allTasks = res);
  }

  public searchTask(searchValue: string): void {
    if (!searchValue) {
      this.foundTasks = [];
      return;
    }
    searchValue = searchValue.toLowerCase().trim();
    this.foundTasks = this.allTasks
      .filter((item) => item.title.includes(searchValue)
        || item.description?.includes(searchValue));
  }

  public goToTask(task: TaskI) {
    this.router.navigate(['/boards', task.boardId]);
    this.dialog.open(
      TaskEditDialogComponent,
      {
        data: { task, columnId: task.columnId, boardId: task.boardId },
        width: '500px',
      },
    );
  }
}
