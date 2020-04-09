import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(timeOpen: number, message: string, messageType: string, messageTitle?: string, extraInfo: boolean = true): void {
    const conf = {
      data: {
        message,
        messageTitle,
        messageType,
        extraInfo
      },
      duration: timeOpen,
    }
    this.snackBar.openFromComponent(SnackbarComponent, conf);
  }
}
