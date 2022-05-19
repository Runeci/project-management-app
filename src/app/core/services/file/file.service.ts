import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) { }

  upLoadFile(file: FormData) {
    return this.http.post('/api/file', file, { responseType: 'text' as 'json' });
  }

  getFile(taskid: string, filename: string) {
    return this.http.get(`/api/file/${taskid}/${filename}`, { responseType: 'blob' });
  }
}
