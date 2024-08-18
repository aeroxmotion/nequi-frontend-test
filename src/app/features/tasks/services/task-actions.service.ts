import { RxDocument } from 'rxdb'
import { inject, Injectable } from '@angular/core'

import { type ITask } from 'src/db'
import { TasksStoreService } from './tasks-store.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { DevLoggerService } from 'src/app/shared/services/dev-logger.service'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TaskActionsService {
  private $toast = inject(ToastService)
  private $loading = inject(LoadingService)
  private $devLogger = inject(DevLoggerService)

  private $tasksStore = inject(TasksStoreService)

  async addTask({ name, category }: ITask) {
    const loading = await this.$loading.show('Añadiendo tarea...')

    try {
      const addedTask = await firstValueFrom(
        this.$tasksStore.add({
          name: name!,
          done: false,
          category: category ? (category as string) : void 0,
        }),
      )

      await loading.dismiss()
      await this.$toast.success('Tarea añadida')

      return addedTask
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al añadir la tarea')

      throw error
    }
  }

  async saveTask(task: RxDocument<ITask>, data: Partial<ITask>) {
    const loading = await this.$loading.show('Guardando tarea...')

    try {
      await task.incrementalPatch(data)

      await loading.dismiss()
      await this.$toast.success('Tarea añadida')
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al añadir la tarea')

      throw error
    }
  }

  async removeTask(task: RxDocument<ITask>) {
    const loading = await this.$loading.show('Eliminando tarea...')

    try {
      await task.incrementalRemove()

      await loading.dismiss()
      await this.$toast.success('Tarea eliminada')
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al guardar la tarea')

      throw error
    }
  }
}
