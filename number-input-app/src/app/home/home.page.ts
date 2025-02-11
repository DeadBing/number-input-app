import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Управление числом
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-input
          type="number"
          [(ngModel)]="inputNumber"
          [disabled]="!isInputEnabled"
          placeholder="Введите число">
        </ion-input>
      </ion-item>

      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button
              expand="block"
              (click)="enableInput()"
              [disabled]="hasInitialValue || isInputEnabled">
              Внести число
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
              expand="block"
              (click)="saveNumber()"
              [disabled]="!canSave">
              Сохранить
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
              expand="block"
              (click)="enableEdit()"
              [disabled]="!hasInitialValue">
              Изменить
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-item *ngIf="savedNumber">
        <ion-label>
          Сохраненное значение: {{ savedNumber }}
        </ion-label>
      </ion-item>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
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