import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/pages/tasks-list/tasks-list.page').then(
        (m) => m.TasksListPage,
      ),
  },
  {
    path: 'task-categories',
    loadComponent: () =>
      import(
        './features/task-categories/pages/task-categories-list/task-categories-list.page'
      ).then((m) => m.TaskCategoriesListPage),
  },
]
