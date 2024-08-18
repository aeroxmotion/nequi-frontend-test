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
  IonChip,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular/standalone'
import { map } from 'rxjs'
import { type RxDocument } from 'rxdb'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { type ITask, type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { TasksStoreService } from '../../services/tasks-store.service'
import { TaskCategoriesStoreService } from 'src/app/features/task-categories/services/task-categories-store.service'

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
    IonChip,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  ],
})
export class TasksListPage {
  private $modal = inject(ModalService)

  private $tasksStore = inject(TasksStoreService)
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

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

  openTaskModal(task?: RxDocument<ITask>) {
    return this.$modal.showLazy(
      import('../../modals/task-modal/task-modal.component').then(
        (m) => m.TaskModalComponent,
      ),
      { task },
    )
  }

  log() {
    console.log('Cliccking')
  }

  toggleTaskDone(task: RxDocument<ITask>, event: MouseEvent) {
    event.stopPropagation()

    return task.incrementalPatch({
      done: !task.done,
    })
  }

  removeTask(task: RxDocument<ITask>) {
    return task.remove()
  }
}
