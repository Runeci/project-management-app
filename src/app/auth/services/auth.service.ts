import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
 BehaviorSubject, Observable, of, switchMap, tap,
} from 'rxjs';

import { Path, StorageKeys } from 'src/app/app.constants';
import { LocalStorageService } from '@core/services/localstorage.service';
import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$$ = this.isLoggedIn$.pipe();

  currentUser!: UserInfo;

  get token(): string | undefined {
    return this.storageService.loadFromLocalStorage(
      StorageKeys.authToken,
    ) as string;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
  ) {
    this.isLoggedIn$.next(!!this.token);
  }

  signUp(user: UserAuth): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${environment.BASE_URL}/signup`, user).pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      }),
    );
  }

  login({ login, password }: UserAuth) {
    return this.http
      .post<{ token: string }>(`${environment.BASE_URL}/signin`, { login, password })
      .pipe(
        switchMap(({ token }) => {
          this.isLoggedIn$.next(true);
          this.setStorage(token);
          this.router.navigate([Path.boardsPage]);
          return this.getUsers(token);
        }),
        tap((users: UserInfo[] | undefined) => {
          if (users) {
            this.currentUser = users.find(
              (user: { login: string }) => user.login === login,
            )!;
            this.storageService.setStorageData(
              this.currentUser,
              StorageKeys.user,
            );
          }
        }),
      );
  }

  setStorage(token: string): void {
    this.storageService.setStorageData(token, StorageKeys.authToken);
  }

  getUsers(token: string): Observable<UserInfo[] | undefined> {
    if (!token) {
      return of(undefined);
    }
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/users`);
  }

  logout(): void {
    this.storageService.removeStorage(StorageKeys.authToken);
    this.isLoggedIn$.next(false);
  }
}
