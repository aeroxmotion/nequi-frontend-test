import { Component, inject, OnInit } from '@angular/core'
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
} from '@ionic/angular/standalone'

import { ITaskCategory } from 'src/db'
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
  ],
})
export class TasksListPage implements OnInit {
  private $modal = inject(ModalService)

  private $tasksStore = inject(TasksStoreService)
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  tasks$ = this.$tasksStore.getAll()
  taskCategories$ = this.$taskCategoriesStore.getAll()
  cachedCategories: Record<NonNullable<ITaskCategory['id']>, ITaskCategory> = {}

  ngOnInit() {
    this.taskCategories$.subscribe((categories) => {
      this.cachedCategories = {}

      for (const category of categories) {
        this.cachedCategories[category.id!] = category
      }
    })
  }

  openNewTaskModal() {
    return this.$modal.showLazy(
      import('../../modals/new-task-modal/new-task-modal.component').then(
        (m) => m.NewTaskModalComponent,
      ),
    )
  }
}
