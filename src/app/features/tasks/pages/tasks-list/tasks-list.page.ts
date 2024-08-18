import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonChip,
} from '@ionic/angular/standalone'
import { map } from 'rxjs'
import { type RxDocument } from 'rxdb'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { type ITask, type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { TasksStoreService } from '../../services/tasks-store.service'
import { TaskActionsService } from '../../services/task-actions.service'
import { TaskCategoriesStoreService } from 'src/app/features/task-categories/services/task-categories-store.service'
import { FeatureFlagsService } from 'src/app/shared/services/feature-flags.service'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    ScrollingModule,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonBadge,
    IonChip,
  ],
})
export class TasksListPage {
  private $modal = inject(ModalService)
  private $featureFlags = inject(FeatureFlagsService)

  private $tasksStore = inject(TasksStoreService)
  private $taskActions = inject(TaskActionsService)
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  withTaskCategories$ = this.$featureFlags.withBoolean$('task_categories')

  tasks$ = this.$tasksStore.getAll()

  taskCategories$ = this.$taskCategoriesStore.getAll()
  taskCategoryByID$ = this.taskCategories$.pipe(
    map((categories) =>
      categories.reduce(
        (acc, category) => ({
          ...acc,
          [category.id!]: category,
        }),
        {} as Record<NonNullable<ITaskCategory['id']>, ITaskCategory>,
      ),
    ),
  )

  selectedCategory: ITaskCategory['id'] = ''

  openTaskModal(task?: RxDocument<ITask>) {
    return this.$modal.showLazy(
      import('../../modals/task-modal/task-modal.component').then(
        (m) => m.TaskModalComponent,
      ),
      { task },
    )
  }

  toggleTaskDone(task: RxDocument<ITask>, event: MouseEvent) {
    event.stopPropagation()

    return task.incrementalPatch({
      done: !task.done,
    })
  }

  filterByCategory(categoryID: NonNullable<ITaskCategory['id']>) {
    if (this.selectedCategory === categoryID) {
      this.selectedCategory = ''
      this.tasks$ = this.$tasksStore.getAll()
    } else {
      this.selectedCategory = categoryID
      this.tasks$ = this.$tasksStore.getAllByCategoryID(categoryID)
    }
  }

  removeTask(task: RxDocument<ITask>) {
    return this.$taskActions.removeTask(task)
  }
}
