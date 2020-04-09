import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ResultQuestion } from './classes/result-question';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  public says: Subject<ResultQuestion>;

  constructor(public dialogRef: MatDialogRef<QuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.inputText = '';
    this.says = new Subject();
  }

  ngOnDestroy() {
    this.dialogRef = null;
  }

  decline(): void {
    const response = new ResultQuestion();
    response.question = false;
    response.text = this.data.inputText;
    this.says.next(response);
    this.dialogRef.close(response);
  }

  confirm(): void {
    const response = new ResultQuestion();
    response.question = true;
    response.text = this.data.inputText;
    this.says.next(response);
    this.dialogRef.close(response);
  }

  close(): void {
    this.dialogRef.close();
  }
}

export interface DialogData  {
  title: string;
  message: string;
  closeBtnName: string;
  question: string;
  enterText: boolean;
  placeholder: string;
  inputText: string;
}
