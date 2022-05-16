import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '@shared/models/boards.interfaces';
import { Observable } from 'rxjs';
import { Column } from '@shared/models/columns.interfaces';
import { TaskI } from '@shared/models/tasks.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {
  }

  public getTasks(boardId: Board['id'], columnId: Column['id']): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(`/api/boards/${boardId}/columns/${columnId}/tasks`);
  }

  public getTask(
    boardId: Board['id'],
    columnId: Column['id'],
    taskId: TaskI['id'],
  ) {
    return this.http.get<TaskI>(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  public createTask(
    boardId: Board['id'],
    columnId: Column['id'],
    body: Pick<TaskI, 'title' | 'order' | 'description' | 'userId' | 'done'>,
) {
    return this.http.post<TaskI>(`/api/boards/${boardId}/columns/${columnId}/tasks`, body);
  }

  public updateTask(
      boardId: Board['id'],
      columnId: Column['id'],
      taskId: TaskI['id'],
      body: Exclude<TaskI, 'id'>,
  ) {
    return this.http.put<TaskI>(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, body);
  }

  public deleteTask(
    boardId: Board['id'],
    columnId: Column['id'],
    taskId: TaskI['id'],
  ) {
    return this.http.delete<TaskI>(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
