import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmComponent } from '@core/components/confirm/confirm.component';
import { ConfirmDialog } from '@shared/models/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialog): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        width: '30%',
        disableClose: true,
      })
      .afterClosed();
  }
}
