import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '@shared/models/boards.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardsApiService {
  constructor(private http: HttpClient) {}

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${environment.BASE_URL}/boards`);
  }

  public createBoard(title: Board['title'], description: Board['description']) {
    const body = {
      title,
      description,
    };
    return this.http.post<Board>(`${environment.BASE_URL}/boards`, body);
  }

  public updateBoard(id: Board['id'], title: Board['title']) {
    return this.http.put(`${environment.BASE_URL}/boards/${id}`, { title });
  }

  public getBoard(id: Board['id']): Observable<Board> {
    return this.http.get<Board>(`${environment.BASE_URL}/boards/${id}`);
  }

  public deleteBoard(id: Board['id']) {
    return this.http.delete(`${environment.BASE_URL}/boards/${id}`);
  }
}
