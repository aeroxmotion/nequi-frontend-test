import { RxJsonSchema } from 'rxdb'

export interface ITaskCategory {
  id?: string
  name: string
  color: string
  created_at?: number
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
    created_at: {
      minimum: 0,
      maximum: 2_000_000_000_000,
      type: 'number',
      multipleOf: 1,
    },
  },
  indexes: ['created_at'],
  required: ['id', 'name', 'color'],
}
