import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { EntityModalComponent } from './entity-modal.component';
import { EntityService } from '../../services';
import { ObjectFunctionsService } from 'src/app/shared/functions';
import { QuestionService } from 'src/app/shared/components/question/service/question.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/services/snackbar.service';

describe('EntityModalComponent', () => {
  let component: EntityModalComponent;
  let fixture: ComponentFixture<EntityModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [EntityModalComponent],
      providers: [
        { provide: EntityService, useValue: {} },
        { provide: ObjectFunctionsService, useValue: { unsubscribeSubscription: jasmine.createSpy('unsubscribeSubscription') } },
        { provide: QuestionService, useValue: {} },
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { entity: null, dialogState: null } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
