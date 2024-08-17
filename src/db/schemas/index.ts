import { type RxCollection } from 'rxdb'

import { type ITask } from './task'
import { type ITaskCategory } from './task-category'

export * from './task'
export * from './task-category'

export interface DBCollections {
  tasks: RxCollection<ITask>
  tasks_categories: RxCollection<ITaskCategory>
}
