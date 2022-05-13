import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmComponent } from '@core/components/confirm/confirm.component';
import { ConfirmDialog } from '@shared/models/confirm-dialog';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  confirmDialog(data: ConfirmDialog): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data: {
          title: this.translateService.instant(data.title),
          message: this.translateService.instant(data.message),
          param: this.translateService.instant(data.param),
          confirmCaption: this.translateService.instant(data.confirmCaption),
          cancelCaption: this.translateService.instant(data.cancelCaption),
        },
        width: '60%',
        disableClose: true,
      })
      .afterClosed();
  }
}
