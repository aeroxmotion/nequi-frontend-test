import { TestBed } from '@angular/core/testing';

import { TaskActionsService } from './task-actions.service';

describe('TaskActionsService', () => {
  let service: TaskActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
