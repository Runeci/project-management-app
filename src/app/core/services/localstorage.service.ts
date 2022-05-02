import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private usedLocalStorage: Storage | undefined;

  currentToken: string | undefined;

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

  loadFromLocalStorage(storageName: string): void {
    const storageData = this.getStorageItem(storageName);
    const checkStorageData = (data: string | null | undefined) => data;
    if (!checkStorageData(storageData)) {
      this.currentToken = '';
    } else {
      const data: string = JSON.parse(storageData!);
      this.currentToken = data;
    }
  }

  getStorageData(): string | undefined {
    return this.currentToken;
  }

  setStorageData(token: string, storageName: string): void {
    this.currentToken = token;
    this.saveToStorage(storageName);
  }

  saveToStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.setItem(storageName, JSON.stringify(this.currentToken));
    }
  }

  removeStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.removeItem(storageName);
    }
  }
}
