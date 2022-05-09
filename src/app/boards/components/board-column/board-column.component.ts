import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from '@shared/models/columns.interfaces';
import { TaskI } from '@shared/models/tasks.interfaces';
import { TaskApiService } from '@boards/services/task-api.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@shared/models/boards.interfaces';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '@boards/components/new-task-dialog/new-task-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: Column;

  @Input() columnsArr!: Column[];

  @Output() deletedColumn = new EventEmitter<Pick<Column, 'order' | 'id'>>();

  public editColumnInput: boolean = false;

  public newColumnTitle!: Column['title'];

  private boardId: Board['id'];

  constructor(
    private tasksApiService: TaskApiService,
    private columnApiService: ColumnsApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.params['id'];

    this.newColumnTitle = this.column.title;
  }

  private getTasks() {
    this.tasksApiService.getTasks(this.boardId, this.column.id)
      .pipe(
        take(1),
      )
      .subscribe((res) => {
        // @ts-ignore
        this.column.tasks = res.sort((prev, next) => prev.order - next.order);
      });
  }

  public deleteColumn(event: Event) {
    event.stopPropagation();
    this.deletedColumn.emit({ order: this.column.order, id: this.column.id });
  }

  public updateColumnName() {
    if (this.newColumnTitle && this.newColumnTitle !== this.column.title) {
      this.columnApiService.updateColumn(
        this.boardId,
        this.column.id,
        {
          title: this.newColumnTitle.trim(),
          order: this.column.order,
        },
      )
        .subscribe();
    }
    this.column.title = this.newColumnTitle;
    this.toggleColumnInput();
  }

  public deleteTask(task: Pick<TaskI, 'id' | 'order'>) {
    this.tasksApiService
      .deleteTask(this.boardId, this.column.id, task.id).subscribe(
      () => {
        this.column.tasks.splice(task.order - 1, 1);

        this.column.tasks = this.column.tasks.map((task, index) => ({
          id: task.id,
          title: task.title,
          done: task.done,
          userId: task.userId,
          description: task.description,
          files: task.files,
          order: index + 1,
        }))

        this.updateTasksOrder(this.column.tasks, this.column.id)
      }
    );
  }

  public toggleColumnInput(): void {
    this.editColumnInput = !this.editColumnInput;
  }

  public openNewTaskDialog() {
    const ref = this.dialog.open(
      NewTaskDialogComponent,
      {
        data:
          {
            taskOrder: this.column.tasks.length + 1,
            columnId: this.column.id,
            boardId: this.boardId,
          },
      },
    );

    ref.afterClosed().subscribe(
      () => this.getTasks(),
    );
  }

  public getConnectedList(): string[] {
    return this.columnsArr.map((x: { order: any; }) => `${ x.order }`);
  }

  public dropItem(event: CdkDragDrop<any>) {
    const draggedTask = event.item.data;
    const startColumn = this.columnsArr.filter((i) => i.tasks.includes(draggedTask));
    const startColumnId = startColumn[0].id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasksOrder(event.container.data, this.column.id);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.tasksApiService.updateTask(
        this.boardId,
        startColumnId,
        draggedTask.id,
        {
          title: draggedTask.title,
          order: event.container.data.indexOf(draggedTask) + 1,
          userId: draggedTask.userId,
          description: draggedTask.description,
          boardId: this.boardId,
          columnId: this.column.id,
          done: false,
        },
      ).subscribe(
        () => {
          this.updateTasksOrder(event.container.data, this.column.id);
        },
      );
    }
  }

  private updateTasksOrder(tasksArr: TaskI[], columnId: Column['id']) {
    tasksArr.forEach((task, index) => {
      this.tasksApiService.updateTask(
        this.boardId,
        columnId,
        task.id,
        {
          title: task.title,
          order: index + 1,
          description: task.description,
          userId: task.userId,
          boardId: this.boardId,
          columnId,
          done: false,
        },
      ).subscribe();
    });
  }
}
