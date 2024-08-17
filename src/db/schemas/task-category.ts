import { RxJsonSchema } from 'rxdb'

export interface ITaskCategory {
  id?: string
  name: string
  color: string
}

export const TaskCategorySchema: RxJsonSchema<ITaskCategory> = {
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
    color: {
      type: 'string',
    },
  },
  required: ['id', 'name', 'color'],
}
