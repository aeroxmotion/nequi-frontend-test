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
  ModalController,
  IonIcon,
} from '@ionic/angular/standalone'

import { TaskService } from '../task.service'
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
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
export class TasksPage {
  private $task = inject(TaskService)
  private $modalCtrl = inject(ModalController)

  tasks$ = this.$task.getAll()

  async openNewTaskModal() {
    const modal = await this.$modalCtrl.create({
      component: NewTaskModalComponent,
    })

    modal.present()
  }
}
