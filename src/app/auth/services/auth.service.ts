import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { STORAGE_NAME } from 'src/app/app.constants';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: LocalstorageService
  ) {
    this.storageService.loadFromLocalStorage(STORAGE_NAME);
  }

  signUp(user: User) {
    return this.http.post<User>('/api/signup', user);
  }

  login(login: string, password: string) {
    return this.http.post<{ token: string }>('', { login, password }).pipe(
      tap(({ token }) => {
        this.setStorage(token)
        return token;
      })
    );
  }

  setStorage(token: string): void {
    this.storageService.setStorageData(token, STORAGE_NAME);
  }
}
