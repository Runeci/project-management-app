import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { Path, StorageKeys } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  get currentUser(): UserInfo | undefined {
    return this.storageService.loadFromLocalStorage(
      StorageKeys.user,
    ) as UserInfo;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
  ) {}

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/users`);
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.BASE_URL}/users/${id}`);
  }

  updateUser(id: string, user: UserAuth): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${environment.BASE_URL}/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.BASE_URL}/users/${id}`).pipe(
      tap(() => {
        this.router.navigate([Path.homePage]);
      }),
    );
  }

  logout(): void {
    this.storageService.removeStorage(StorageKeys.user);
  }
}
