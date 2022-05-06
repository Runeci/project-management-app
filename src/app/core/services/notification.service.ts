import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message: string | undefined;

  constructor(
    private toast: NgToastService,
    private translateService: TranslateService
  ) {}

  translateToast(message: string, action?: string): void {
    this.checkTypeOfMessage(message);
    if (action === 'error') {
      this.createToastError(this.message);
    } else this.createToastSuccess(this.message);
  }

  checkTypeOfMessage(message: string | string[]) {
    if (Array.isArray(message)) {
      this.message = Object.values(
        this.translateService.instant(message)
      ).toString();
    } else {
      this.message = this.translateService.instant(message);
    }
    return this.message;
  }

  createToastError(message: string | undefined): void {
    this.toast.error({
      detail: 'Error Message',
      summary: message,
      duration: 100000,
    });
  }

  createToastSuccess(message: string | undefined): void {
    this.toast.warning({
      detail: 'Success',
      summary: message,
      duration: 100000,
    });
  }
}
