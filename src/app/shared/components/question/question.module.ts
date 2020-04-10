import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from './service/question.service';
import { QuestionComponent } from './question.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

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
    MaterialModule,
    TranslateModule
  ],
  providers: [
    QuestionService
  ]
})
export class QuestionModule { }
