import { firstValueFrom } from 'rxjs'
import { type RxDocument } from 'rxdb'
import { inject, Injectable } from '@angular/core'

import { type ITaskCategory } from 'src/db'
import { ToastService } from 'src/app/shared/services/toast.service'
import { ModalService } from 'src/app/shared/services/modal.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { TaskCategoriesStoreService } from './task-categories-store.service'
import { DevLoggerService } from 'src/app/shared/services/dev-logger.service'

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryActionsService {
  private $toast = inject(ToastService)
  private $modal = inject(ModalService)
  private $loading = inject(LoadingService)
  private $devLogger = inject(DevLoggerService)

  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  async addCategory({ name, color }: Partial<ITaskCategory>) {
    const loading = await this.$loading.show('Añadiendo categoría...')

    try {
      const addedCategory = await firstValueFrom(
        this.$taskCategoriesStore.add({
          name: name!,
          color: color!,
        }),
      )

      await loading.dismiss()
      await this.$modal.dismissIfActive(addedCategory)
      await this.$toast.success('Categoría añadida')

      return addedCategory
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error(`Ocurrió un error al añadir la categoría`)

      throw error
    }
  }

  async saveCategory(
    category: RxDocument<ITaskCategory>,
    data: Partial<ITaskCategory>,
  ) {
    const loading = await this.$loading.show('Guardando categoría...')

    try {
      await category.incrementalPatch(data)

      await loading.dismiss()
      await this.$modal.dismissIfActive()
      await this.$toast.success('Categoría guardada')
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error(`Ocurrió un error al guardar la categoría`)

      throw error
    }
  }

  async removeCategory(category: RxDocument<ITaskCategory>) {
    const loading = await this.$loading.show('Eliminando categoría...')

    try {
      await category.incrementalRemove()

      await loading.dismiss()
      await this.$modal.dismissIfActive()
      await this.$toast.success('Categoría eliminada')
    } catch (error) {
      this.$devLogger.logError(error)

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al eliminar la categoría')

      throw error
    }
  }
}
