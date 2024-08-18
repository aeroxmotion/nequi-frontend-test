import { TestBed } from '@angular/core/testing';

import { DevLoggerService } from './dev-logger.service';

describe('DevLoggerService', () => {
  let service: DevLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
