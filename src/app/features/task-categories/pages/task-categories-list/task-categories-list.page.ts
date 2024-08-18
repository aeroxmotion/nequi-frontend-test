import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
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
import { TaskCategoriesStoreService } from '../../services/task-categories-store.service'

@Component({
  selector: 'app-task-categories-list',
  templateUrl: './task-categories-list.page.html',
  styleUrls: ['./task-categories-list.page.scss'],
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
    IonChip,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  ],
})
export class TaskCategoriesListPage {
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  taskCategories$ = this.$taskCategoriesStore.getAll()
}
