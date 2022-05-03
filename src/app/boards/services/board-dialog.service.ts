import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardDialogService {
  private subject = new Subject<unknown>();

  public newEvent(event: string) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
  }
}
