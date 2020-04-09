import { MaterialModule } from './../../../core/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarService } from './services/snackbar.service';



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
