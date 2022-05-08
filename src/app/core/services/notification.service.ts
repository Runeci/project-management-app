import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message: string = '';

  constructor(private inject: Injector, private toast: NgToastService) {}

  translateToast(message: string, action?: string): void {
    this.translateMessage(message as string);
    if (action === 'error') {
      this.createToastError(this.message);
    } else this.createToastSuccess(this.message);
  }

  translateMessage(message: string | string[]) {
    const translateService = this.inject.get(TranslateService);
    if (Array.isArray(message)) {
      this.message = Object.values(
        translateService.instant(message),
      ).toString();
    } else {
      this.message = translateService.instant(message);
    }
    return this.message;
  }

  createToastError(message: string): void {
    this.toast.error({
      detail: 'Error Message',
      summary: message,
      duration: 7000,
    });
  }

  createToastSuccess(message: string | undefined): void {
    this.toast.warning({
      detail: 'Success Message',
      summary: message,
      duration: 7000,
    });
  }
}
