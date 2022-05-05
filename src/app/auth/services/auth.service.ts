import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { Path, StorageKeys } from 'src/app/app.constants';
import { LocalStorageService } from '@core/services/localstorage.service';
import { UserAuth, UserInfo } from '@shared/models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$$ = this.isLoggedIn$.pipe();

  currentUser!: UserInfo;

  get token(): string | undefined {
    return this.storageService.getStorageData() as string;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) {
    this.storageService.loadFromLocalStorage(StorageKeys.authToken);
    this.isLoggedIn$.next(!!this.token);
  }

  signUp(user: UserAuth): Observable<UserInfo> {
    return this.http.post<UserInfo>('/api/signup', user).pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      }),
      catchError(AuthService.handleAuthError)
    );
  }

  login({ login, password }: UserAuth) {
    return this.http
      .post<{ token: string }>('/api/signin', { login, password })
      .pipe(
        switchMap(({ token }) => {
          this.isLoggedIn$.next(true);
          this.setStorage(token);
          this.router.navigate([Path.boardsPage]);
          return this.getUsers(token);
        }),
        tap((users) => {
          if (users) {
            this.currentUser = users.find(
              (user: { login: string }) => user.login === login
            )!;
            this.storageService.setStorageData(
              this.currentUser,
              StorageKeys.user
            );
          }
        }),
        catchError(AuthService.handleAuthError)
      );
  }

  setStorage(token: string): void {
    this.storageService.setStorageData(token, StorageKeys.authToken);
  }

  getUsers(token: string): Observable<UserInfo[] | undefined> {
    if (!token) {
      return of(undefined);
    }
    return this.http.get<UserInfo[]>('/api/users');
  }

  static handleAuthError(error: HttpErrorResponse): Observable<never> {
    let errorMessage;
    if (error.status) {
      errorMessage = error.error.message;
    } else errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  logout(): void {
    this.storageService.removeStorage(StorageKeys.authToken);
    this.isLoggedIn$.next(false);
  }
}
