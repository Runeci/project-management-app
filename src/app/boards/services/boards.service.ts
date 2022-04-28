import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../../shared/models/boards.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private authHeader = {
    headers: new HttpHeaders()
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NWU4MDY3Yy0wMzMzLTQ2YTgtOTczZC1iNjE2YTk3YWE5MDUiLCJsb2dpbiI6IjEyMyIsImlhdCI6MTY1MTE1MjI4NX0.4F10EnMJ3tiSTwU5kXQ-OxugVWWBuQ__JkNqQI74pSA')
  };

  constructor(private http: HttpClient) {
  }

  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards', this.authHeader);
  }

  public createBoard(title: Board['title']) {
    return this.http.post<Board>('/boards', { title: title }, this.authHeader);
  }

  public updateBoard(id: Board['id'], title: Board['title']) {
    return this.http.put(`/boards/${ id }`, { title: title }, this.authHeader);
  }

  public getBoard(id: Board['id']) {
    return this.http.get(`/boards/${ id }`, this.authHeader);
  }

  public deleteBoard(id: Board['id']) {
    return this.http.delete(`/boards/${ id }`,  this.authHeader);
  }
}
