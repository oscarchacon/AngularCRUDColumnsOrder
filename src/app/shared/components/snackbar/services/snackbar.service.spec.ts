import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: MatSnackBar, useValue: { openFromComponent: jasmine.createSpy('openFromComponent') } }
    ]
  }));

  it('should be created', () => {
    const service: SnackbarService = TestBed.inject(SnackbarService);
    expect(service).toBeTruthy();
  });
});
