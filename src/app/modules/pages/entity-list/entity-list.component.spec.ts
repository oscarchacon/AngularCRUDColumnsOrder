import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { EntityListComponent } from './entity-list.component';
import { EntityService } from '../../services';
import { ObjectFunctionsService } from 'src/app/shared/functions';
import { SnackbarService } from 'src/app/shared/components/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from 'src/app/shared/components/question/service/question.service';

describe('EntityListComponent', () => {
  let component: EntityListComponent;
  let fixture: ComponentFixture<EntityListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [EntityListComponent],
      providers: [
        { provide: EntityService, useValue: { getEntitiesPaged: () => of({ results: [], rowCount: 0 }) } },
        { provide: ObjectFunctionsService, useValue: { unsubscribeSubscription: jasmine.createSpy('unsubscribeSubscription') } },
        { provide: SnackbarService, useValue: {} },
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        { provide: QuestionService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
