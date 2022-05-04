import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from '@shared/models/columns.interfaces';
import { TaskI } from '@shared/models/tasks.interfaces';
import { TaskApiService } from '@boards/services/task-api.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@shared/models/boards.interfaces';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: Column;

  public tasksArr: TaskI[] = [];

  private boardId: Board['id'];

  constructor(private tasksApiService: TaskApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.params['id'];

    this.tasksApiService.getTasks(this.boardId, this.column.id)
      .subscribe((res) => {
        this.tasksArr =
          res.sort((prev, next) => prev.order - next.order);
      });
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
          boardId: task.boardId,
          columnId: columnId,
        }
      ).subscribe();
    });
  }

  public deleteTask(columnId: Column['id'], taskId: TaskI['id']) {
    this.tasksApiService
      .deleteTask(this.boardId, columnId, taskId).subscribe();
  }

  public addTask() {
    this.tasksApiService.createTask(this.boardId, this.column.id,
      {
        title: Math.random().toString(),
        order: this.tasksArr.length + 1,
        description: 'hi',
        userId: '55e8067c-0333-46a8-973d-b616a97aa905',
      }
    ).subscribe();
  }

  public drop(event: CdkDragDrop<TaskI[]>) {
    const draggedTask = event.item.data;
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

      this.tasksApiService.updateTask(this.boardId, draggedTask.columnId, draggedTask.id,
        {
          title: draggedTask.title,
          order: event.container.data.indexOf(draggedTask) + 1,
          userId: draggedTask.userId,
          description: draggedTask.description,
          boardId: this.boardId,
          columnId: this.column.id,
        }).subscribe(
        () => {
          this.updateTasksOrder(event.container.data, this.column.id);
          console.log(event.previousContainer.data);
        }
      );

      this.updateTasksOrder(event.previousContainer.data, draggedTask.columnId);
      draggedTask.columnId = this.column.id;
    }
  }
}
