import { mergeMap } from 'rxjs'
import { Injectable } from '@angular/core'

import { type ITask, DB_OBSERVABLE, withGeneratedID } from 'src/db'

@Injectable({
  providedIn: 'root',
})
export class TasksStoreService {
  getAll() {
    return DB_OBSERVABLE.pipe(
      mergeMap((db) => db.tasks.find({ sort: [{ created_at: 'desc' }] }).$),
    )
  }

  add(task: ITask) {
    return DB_OBSERVABLE.pipe(
      mergeMap((db) => db.tasks.insert(withGeneratedID(task))),
    )
  }
}
