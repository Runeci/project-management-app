import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '@shared/models/boards.interfaces';
import { Observable } from 'rxjs';
import { Column } from '@shared/models/columns.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColumnsApiService {
  constructor(private http: HttpClient) { }

  public getColumns(id: Board['id']): Observable<Column[]> {
    return this.http.get<Column[]>(`/api/boards/${id}/columns`);
  }

  public createColumn(id: Board['id'], body: Pick<Column, 'title' | 'order'>) {
    return this.http.post<Column>(`/api/boards/${id}/columns`, body);
  }

  public getColumn(boardId: Board['id'], columnId: Column['id']): Observable<Column> {
    return this.http.get<Column>(`/api/boards/${boardId}/columns/${columnId}`);
  }

  public deleteColumn(boardId: Board['id'], columnId: Column['id']): Observable<Column> {
    return this.http.delete<Column>(`/api/boards/${boardId}/columns/${columnId}`);
  }

  public updateColumn(
    boardId: Board['id'],
    columnId: Column['id'],
    body: Pick<Column, 'title' | 'order'>,
    ): Observable<Column> {
    return this.http.put<Column>(`/api/boards/${boardId}/columns/${columnId}`, body);
  }
}
