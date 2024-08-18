import { Injectable } from '@angular/core'
import { mergeMap } from 'rxjs'

import { DB_OBSERVABLE, withGeneratedID, type ITaskCategory } from 'src/db'

@Injectable({
  providedIn: 'root',
})
export class TaskCategoriesStoreService {
  getAll() {
    return DB_OBSERVABLE.pipe(
      mergeMap(
        (db) => db.tasks_categories.find({ sort: [{ created_at: 'desc' }] }).$,
      ),
    )
  }

  add(category: ITaskCategory) {
    return DB_OBSERVABLE.pipe(
      mergeMap((db) => db.tasks_categories.insert(withGeneratedID(category))),
    )
  }
}
