import { mergeMap } from 'rxjs'
import { Injectable } from '@angular/core'

import {
  DB_OBSERVABLE,
  withGeneratedID,
  type ITask,
  type ITaskCategory,
} from 'src/db'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getAll() {
    return DB_OBSERVABLE.pipe(mergeMap((db) => db.tasks.find().$))
  }

  getByCategories(categoryIDs: ITaskCategory['id'][]) {
    return DB_OBSERVABLE.pipe(
      mergeMap(
        (db) =>
          db.tasks.findOne({
            selector: {
              category: {
                $in: categoryIDs,
              },
            },
          }).$,
      ),
    )
  }

  add(task: ITask) {
    return DB_OBSERVABLE.pipe(
      mergeMap((db) => db.tasks.insert(withGeneratedID(task))),
    )
  }
}
