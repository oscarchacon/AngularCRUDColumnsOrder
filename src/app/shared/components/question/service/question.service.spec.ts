import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
    ]
  }));

  it('should be created', () => {
    const service: QuestionService = TestBed.inject(QuestionService);
    expect(service).toBeTruthy();
  });
});
