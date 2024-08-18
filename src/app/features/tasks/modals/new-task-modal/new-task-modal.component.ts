import { Component, inject, isDevMode, type OnInit } from '@angular/core'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone'
import { firstValueFrom } from 'rxjs'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { ModalService } from 'src/app/shared/services/modal.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TasksStoreService } from '../../services/tasks-store.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { TaskCategoriesStoreService } from 'src/app/features/task-categories/services/task-categories-store.service'

@Component({
  standalone: true,
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonSelect,
    IonSelectOption,
  ],
})
export class NewTaskModalComponent implements OnInit {
  private $formBuilder = inject(FormBuilder)

  private $toast = inject(ToastService)
  private $modal = inject(ModalService)
  private $loading = inject(LoadingService)

  private $tasksStore = inject(TasksStoreService)
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  newCategorySymbol = Symbol()
  categories$ = this.$taskCategoriesStore.getAll()

  taskForm = this.$formBuilder.group({
    name: ['', Validators.required],
    category: ['' as string | symbol],
  })

  ngOnInit() {
    this._listenCategoryChangesToOpenModal()
  }

  async onNewTaskSubmit() {
    const { name, category } = this.taskForm.value

    const loading = await this.$loading.show('Añadiendo tarea...')

    const addedTask$ = this.$tasksStore.add({
      name: name!,
      done: false,
      category: category ? (category as any) : void 0,
    })

    try {
      await firstValueFrom(addedTask$)

      await loading.dismiss()
      await this.dismiss()

      await this.$toast.success('Tarea añadida')
    } catch (error) {
      if (isDevMode()) {
        console.error(error)
      }

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al añadir la tarea')
    }
  }

  dismiss() {
    return this.$modal.dismiss()
  }

  private _listenCategoryChangesToOpenModal() {
    this.taskForm.controls.category.valueChanges.subscribe(async (value) => {
      if (value !== this.newCategorySymbol) {
        return
      }

      // Reset to an empty category
      this.taskForm.controls.category.setValue(null)

      await this.$modal.showLazy(
        import(
          '../../../task-categories/modals/new-category-modal/new-category-modal.component'
        ).then((m) => m.NewCategoryModalComponent),
      )
    })
  }
}
