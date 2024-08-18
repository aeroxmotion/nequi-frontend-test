import { TestBed } from '@angular/core/testing';

import { TaskCategoryActionsService } from './task-category-actions.service';

describe('TaskCategoryActionsService', () => {
  let service: TaskCategoryActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCategoryActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
