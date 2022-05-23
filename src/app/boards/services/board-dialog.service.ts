import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardDialogService {
  private subject = new Subject<string>();

  public newEvent(event: string) {
    this.subject.next(event);
  }

  get events$(): Observable<string> {
    return this.subject.asObservable();
  }
}
