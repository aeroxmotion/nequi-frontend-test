import { TestBed } from '@angular/core/testing';

import { TaskCategoriesStoreService } from './task-categories-store.service';

describe('TaskCategoriesStoreService', () => {
  let service: TaskCategoriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCategoriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
