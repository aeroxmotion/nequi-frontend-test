import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCategoriesListPage } from './task-categories-list.page';

describe('TaskCategoriesListPage', () => {
  let component: TaskCategoriesListPage;
  let fixture: ComponentFixture<TaskCategoriesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCategoriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
