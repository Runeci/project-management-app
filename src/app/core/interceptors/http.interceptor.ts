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
          if (
            !Array.isArray(result.body)
            && !result.url?.includes('assets')
            && !result.url?.includes('boards')
            && !result.url?.includes('signin')
            && !result.url?.includes('file')
          ) {
            notificationService.translateToast(result.statusText);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage;
        if (error.status) {
          errorMessage = error.error.message;
        } if (error.status === 409) {
          errorMessage = error.statusText;
        }
        notificationService.translateToast(errorMessage, 'error');
        return throwError(errorMessage);
      }),
    );
  }
}
