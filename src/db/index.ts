import { from } from 'rxjs'
import { isDevMode } from '@angular/core'
import { createRxDatabase, addRxPlugin } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

import { TaskCategorySchema, TaskSchema, type DBCollections } from './schemas'

export * from './utils'
export * from './schemas'

const DB_NAME = 'tasksdb'

export const DB_OBSERVABLE = from(createLocalDB())

async function createLocalDB() {
  if (isDevMode()) {
    const { RxDBDevModePlugin } = await import('rxdb/plugins/dev-mode')

    addRxPlugin(RxDBDevModePlugin)
  }

  const db = await createRxDatabase<DBCollections>({
    name: DB_NAME,
    // eventReduce: true,
    storage: getRxStorageDexie(),
  })

  await db.addCollections({
    tasks: {
      schema: TaskSchema,
    },
    tasks_categories: {
      schema: TaskCategorySchema,
    },
  })

  return db
}
