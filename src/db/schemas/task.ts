import { type RxJsonSchema } from 'rxdb'

import { type ITaskCategory } from './task-category'

export interface ITask {
  id?: string
  name: string
  done: boolean
  category?: ITaskCategory
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
      ref: 'category',
      type: 'string',
    },
  },
  required: ['id', 'name', 'done'],
}
