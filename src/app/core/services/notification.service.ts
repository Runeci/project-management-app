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
    private translateService: TranslateService,
  ) {}

  translateToastError(message: string): void {
    if (Array.isArray(message)) {
      this.message = Object.values(
        this.translateService.instant(message),
      ).toString();
    } else this.message = this.translateService.instant(message);
    this.createToastError(this.message);
  }

  createToastError(message: string | undefined): void {
    this.toast.error({
      detail: 'Error Message',
      summary: message,
      duration: 10000,
    });
  }
}
