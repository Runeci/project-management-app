import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { Observable } from 'rxjs';
import { StorageKeys } from 'src/app/app.constants';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  get currentUser(): UserInfo | undefined {
    return this.storageService.getStorageData() as UserInfo;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {
    this.storageService.loadFromLocalStorage(StorageKeys.user);
  }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('/api/users');
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/api/users/${id}`);
  }

  updateUser(id: string, user: UserAuth): Observable<UserInfo> {
    return this.http.put<UserInfo>(`/api/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`/api/users/${id}`);
  }
}
