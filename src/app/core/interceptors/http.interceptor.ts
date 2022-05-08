import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
 catchError, Observable, tap, throwError,
} from 'rxjs';

import { NotificationService } from '@core/services/notification.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const notificationService = this.inject.get(NotificationService);
    return next.handle(request).pipe(
      tap((result) => {
        if (result instanceof HttpResponse) {
          if (!Array.isArray(result.body) && !result.url?.includes('assets')) {
            notificationService.translateToast(result.statusText);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage;
        if (error.status) {
          errorMessage = error.error.message;
        }
        notificationService.translateToast(errorMessage, 'error');
        return throwError(errorMessage);
      }),
    );
  }
}
