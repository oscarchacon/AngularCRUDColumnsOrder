import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityModalComponent } from './components';
import { EntityListComponent } from './pages';
import { EntityService } from './services';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FunctionsSharedModule } from '../shared/functions';


@NgModule({
  declarations: [
    EntityModalComponent,
    EntityListComponent
  ],
  entryComponents: [
    EntityModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    FunctionsSharedModule
  ],
  providers: [
    EntityService
  ]
})
export class EntitiesModule { }
