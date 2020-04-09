import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuestionComponent } from '../question.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private dialog: MatDialog) { }

  openModalQuestion(title: string, message: string, question: string): MatDialogRef<QuestionComponent> {
    const conf = {
      panelClass: 'dialog-question',
      width: '250px',
      data: {
        title,
        message,
        question
      }
    };

    return this.dialog.open(QuestionComponent, conf);
  }
}
