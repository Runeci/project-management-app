import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) { }

  upLoadFile(file: FormData) {
    return this.http.post(`${environment.BASE_URL}/file`, file, { responseType: 'text' as 'json' });
  }

  getFile(taskid: string, filename: string) {
    return this.http.get(`${environment.BASE_URL}/file/${taskid}/${filename}`, { responseType: 'arraybuffer' });
  }
}
