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
} from '@ionic/angular/standalone'

import { ModalService } from 'src/app/shared/services/modal.service'
import { TasksStoreService } from '../../services/tasks-store.service'

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
export class TasksListPage {
  private $tasksStore = inject(TasksStoreService)
  private $modal = inject(ModalService)

  tasks$ = this.$tasksStore.getAll()

  openNewTaskModal() {
    return this.$modal.showLazy(
      import('../../modals/new-task-modal/new-task-modal.component').then(
        (m) => m.NewTaskModalComponent,
      ),
    )
  }
}
