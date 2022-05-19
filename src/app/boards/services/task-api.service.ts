import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '@shared/models/boards.interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Column } from '@shared/models/columns.interfaces';
import { TaskFile, TaskI } from '@shared/models/tasks.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private filesNumber$$ = new BehaviorSubject<number>(0);

  public filesNumber$ = this.filesNumber$$.pipe();
  filesArr: number[] = [];

  constructor(private http: HttpClient) {}

  public getTasks(
    boardId: Board['id'],
    columnId: Column['id']
  ): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(
      `/api/boards/${boardId}/columns/${columnId}/tasks`
    );
  }

  public getTask(
    boardId: Board['id'],
    columnId: Column['id'],
    taskId: TaskI['id']
  ) {
    return this.http.get<TaskI>(
      `/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }

  public createTask(
    boardId: Board['id'],
    columnId: Column['id'],
    body: Pick<TaskI, 'title' | 'order' | 'description' | 'userId' | 'done'>
  ) {
    return this.http.post<TaskI>(
      `/api/boards/${boardId}/columns/${columnId}/tasks`,
      body
    );
  }

  public updateTask(
    boardId: Board['id'],
    columnId: Column['id'],
    taskId: TaskI['id'],
    body: Exclude<TaskI, 'id'>
  ) {
    return this.http.put<TaskI>(
      `/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      body
    );
  }

  public deleteTask(
    boardId: Board['id'],
    columnId: Column['id'],
    taskId: TaskI['id']
  ) {
    return this.http.delete<TaskI>(
      `/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }

  getFilesFromTask(boardId: string, columnId: string, taskId?: any) {
    this.getTask(boardId, columnId, taskId).subscribe((res) => {  
      
       this.filesArr.push(res.files!.length)
        this.filesNumber$$.next(res.files!.length)
       
    });
   return this.filesNumber$;
  }
}
