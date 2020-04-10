import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from './service/question.service';
import { QuestionComponent } from './question.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    QuestionComponent
  ],
  entryComponents: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    QuestionService
  ]
})
export class QuestionModule { }
