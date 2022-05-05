import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserInfo } from '@shared/models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private usedLocalStorage: Storage | undefined;

  currentData: string | UserInfo | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.usedLocalStorage = this.getWindowRef();
  }

  getWindowRef(): Storage | undefined {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage;
    }
    return undefined;
  }

  getStorageItem(storageName: string): string | null {
    if (this.usedLocalStorage) {
      const storageData = this.usedLocalStorage.getItem(storageName);
      return storageData;
    }
    return null;
  }

  loadFromLocalStorage<T extends string>(storageName: string): void {
    const storageData = this.getStorageItem(storageName);
    const checkStorageData = (data: string | null | undefined) => data;
    if (!checkStorageData(storageData)) {
      this.currentData = '';
    } else {
      const data: T = JSON.parse(storageData!);
      this.currentData = data;
    }
  }

  getStorageData(): string | UserInfo | undefined {
    return this.currentData;
  }

  setStorageData<T extends string | UserInfo>(data: T, storageName: string): void {
    this.currentData = data;
    this.saveToStorage(storageName);
  }

  saveToStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.setItem(storageName, JSON.stringify(this.currentData));
    }
  }

  removeStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.removeItem(storageName);
    }
  }
}
