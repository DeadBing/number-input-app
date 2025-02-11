import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Управление числом</h2>
      
      <div class="input-container">
        <input 
          type="number" 
          [(ngModel)]="inputNumber" 
          [disabled]="!isInputEnabled"
          placeholder="Введите число">
      </div>

      <div class="buttons-container">
        <button 
          (click)="enableInput()" 
          [disabled]="hasInitialValue || isInputEnabled">
          Внести число
        </button>

        <button 
          (click)="saveNumber()" 
          [disabled]="!canSave">
          Сохранить
        </button>

        <button 
          (click)="enableEdit()" 
          [disabled]="!hasInitialValue">
          Изменить
        </button>
      </div>

      <div *ngIf="savedNumber" class="saved-value">
        Сохраненное значение: {{ savedNumber }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .input-container {
      margin: 20px 0;
    }
    input {
      padding: 8px;
      width: 200px;
    }
    .buttons-container {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      cursor: pointer;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .saved-value {
      margin-top: 20px;
      font-weight: bold;
    }
  `]
})
export class AppComponent implements OnInit {
  inputNumber: number | null = null;
  savedNumber: number | null = null;
  isInputEnabled = false;
  hasInitialValue = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadSavedNumber();
  }

  get canSave(): boolean {
    return this.isInputEnabled && this.inputNumber !== null;
  }

  loadSavedNumber() {
    const saved = this.storageService.getNumber();
    if (saved !== null) {
      this.savedNumber = saved;
      this.inputNumber = saved;
      this.hasInitialValue = true;
    }
  }

  enableInput() {
    this.isInputEnabled = true;
  }

  enableEdit() {
    this.isInputEnabled = true;
  }

  saveNumber() {
    if (this.inputNumber !== null) {
      this.storageService.saveNumber(this.inputNumber);
      this.savedNumber = this.inputNumber;
      this.hasInitialValue = true;
      this.isInputEnabled = false;
    }
  }
}