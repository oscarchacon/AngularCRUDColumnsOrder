import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule { }
