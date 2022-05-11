import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '@shared/models/boards.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(private http: HttpClient) {
  }

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/api/boards');
  }

  public createBoard(title: Board['title'], description: Board['description']) {
    const body = {
      title,
      description,
    };
    return this.http.post<Board>('/api/boards', body);
  }

  public updateBoard(id: Board['id'], title: Board['title']) {
    return this.http.put(`/api/boards/${id}`, { title });
  }

  public getBoard(id: Board['id']) {
    return this.http.get(`/api/boards/${id}`);
  }

  public deleteBoard(id: Board['id']) {
    return this.http.delete(`/api/boards/${id}`);
  }
}
