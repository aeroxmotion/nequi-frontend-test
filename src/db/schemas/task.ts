import { type RxJsonSchema } from 'rxdb'

import { type ITaskCategory } from './task-category'

export interface ITask {
  id?: string
  name: string
  done: boolean
  created_at?: number
  category?: ITaskCategory['id']
}

export const TaskSchema: RxJsonSchema<ITask> = {
  version: 0,
  title: 'Task',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
    },
    done: {
      type: 'boolean',
    },
    category: {
      ref: 'tasks_categories',
      type: 'string',
    },
    created_at: {
      minimum: 0,
      maximum: 2_000_000_000_000,
      type: 'number',
      multipleOf: 1,
    },
  },
  indexes: ['created_at'],
  required: ['id', 'name', 'done'],
}
