import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) { }

  upLoadFile(file: FormData): Observable<void> {
    return this.http.post<void>('/api/file', file);
  }

  getFile(taskid: string, filename: string) {
    return this.http.get(`/api/file/${taskid}/${filename}`, { responseType: 'blob' });
  }
}
