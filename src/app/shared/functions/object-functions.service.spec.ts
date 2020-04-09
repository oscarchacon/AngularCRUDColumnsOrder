import { TestBed } from '@angular/core/testing';

import { ObjectFunctionsService } from './object-functions.service';

describe('ObjectFunctionsService', () => {
  let service: ObjectFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
