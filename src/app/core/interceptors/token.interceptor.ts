import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const authService = this.inject.get(AuthService);
    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.isLoggedIn()}`,
        },
      }),
    );
  }
}
