import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';

import { LocalStorageService } from '@core/services/localstorage.service';
import { Path, STORAGE_NAME } from 'src/app/app.constants';
import { UserAuth, UserInfo, UserResponse } from '@shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$$ = this.isLoggedIn$.pipe();

  get token(): string | undefined {
    return this.storageService.getStorageData();
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
  ) {
    this.storageService.loadFromLocalStorage(STORAGE_NAME);
    this.isLoggedIn$.next(!!this.token);
  }

  signUp(user: UserAuth): Observable<UserInfo> {
    return this.http.post<UserInfo>('/api/signup', user).pipe(
      tap(() => this.router.navigate([Path.loginPage])),
      catchError(AuthService.handleAuthError),
    );
  }

  login({ login, password }: UserAuth): Observable<UserResponse> {
    return this.http
      .post<{ token: string }>('/api/signin', { login, password })
      .pipe(
        tap(({ token }) => {
          this.isLoggedIn$.next(true);
          this.setStorage(token);
          this.router.navigate([Path.boardsPage]);
          return token;
        }),
        catchError(AuthService.handleAuthError),
      );
  }

  setStorage(token: string): void {
    this.storageService.setStorageData(token, STORAGE_NAME);
  }

  getUser(token: string): Observable<UserInfo | undefined> {
    if (!token) {
      return of(undefined);
    }
    return this.http.get<UserInfo>('/api/users');
  }

  static handleAuthError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status) {
      errorMessage = error.error.message;
    } else errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
