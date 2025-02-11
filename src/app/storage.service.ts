import { Injectable } from '@angular/core';

interface ElectronWindow extends Window {
  process?: {
    type?: string;
  };
}

interface CapacitorWindow extends Window {
  Capacitor?: any;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'savedNumber';

  constructor() {}

  saveNumber(number: number): void {
    if (this.isElectron()) {
      window.localStorage.setItem(this.STORAGE_KEY, number.toString());
    } else if (this.isIonic()) {
      window.localStorage.setItem(this.STORAGE_KEY, number.toString());
    } else {
      document.cookie = `${this.STORAGE_KEY}=${number};path=/;max-age=31536000`;
    }
  }

  getNumber(): number | null {
    if (this.isElectron() || this.isIonic()) {
      const saved = window.localStorage.getItem(this.STORAGE_KEY);
      return saved ? Number(saved) : null;
    } else {
      const cookies = document.cookie.split(';');
      const numberCookie = cookies.find(c => c.trim().startsWith(this.STORAGE_KEY + '='));
      if (numberCookie) {
        return Number(numberCookie.split('=')[1]);
      }
      return null;
    }
  }

  private isElectron(): boolean {
    const win = window as ElectronWindow;
    return win?.process?.type === 'renderer';
  }

  private isIonic(): boolean {
    return !!(window as CapacitorWindow)?.Capacitor;
  }
}