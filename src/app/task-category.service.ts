import { mergeMap } from 'rxjs'
import { Injectable } from '@angular/core'

import { DB_OBSERVABLE, withGeneratedID, type ITaskCategory } from 'src/db'

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryService {
  getAll() {
    return DB_OBSERVABLE.pipe(mergeMap((db) => db.tasks_categories.find().$))
  }

  add(category: ITaskCategory) {
    return DB_OBSERVABLE.pipe(
      mergeMap((db) => db.tasks_categories.insert(withGeneratedID(category))),
    )
  }
}
