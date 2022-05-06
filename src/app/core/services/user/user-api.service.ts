import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { StorageKeys } from 'src/app/app.constants';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  get currentUser(): UserInfo | undefined {
    return this.storageService.loadFromLocalStorage(
      StorageKeys.user
    ) as UserInfo;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  /* getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('/api/users');
  } */

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/api/users/${id}`);
  }

  updateUser(id: string, user: UserAuth): Observable<UserInfo> {
    return this.http.put<UserInfo>(`/api/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`/api/users/${id}`);
  }

  logout(): void {
    this.storageService.removeStorage(StorageKeys.user);
  }
}
