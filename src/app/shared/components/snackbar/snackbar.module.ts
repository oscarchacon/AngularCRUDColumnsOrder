import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule { }
