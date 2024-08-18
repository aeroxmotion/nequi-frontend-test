import { Component, inject, Input, isDevMode, type OnInit } from '@angular/core'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common'
import { firstValueFrom, pairwise, startWith } from 'rxjs'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { ITask, type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { TasksStoreService } from '../../services/tasks-store.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { TaskCategoriesStoreService } from 'src/app/features/task-categories/services/task-categories-store.service'
import { RxDocument } from 'rxdb'

@Component({
  standalone: true,
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
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
    IonTextarea,
    IonIcon,
    IonSelect,
    IonSelectOption,
  ],
})
export class TaskModalComponent implements OnInit {
  @Input() task?: RxDocument<ITask>

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
    if (this.task) {
      this.taskForm.setValue({
        name: this.task.name!,
        category: this.task.category ?? '',
      })
    }

    this._listenCategoryChangesToOpenModal()
  }

  async onTaskSubmit() {
    const { name, category } = this.taskForm.value

    const loading = await this.$loading.show(
      `${this.task ? 'Editando' : 'Añadiendo'} tarea...`,
    )

    try {
      if (this.task) {
        await this.task.incrementalPatch({
          name: name!,
          category: category ? (category as string) : void 0,
        })
      } else {
        await firstValueFrom(
          this.$tasksStore.add({
            name: name!,
            done: false,
            category: category ? (category as string) : void 0,
          }),
        )
      }

      await loading.dismiss()
      await this.dismiss()

      await this.$toast.success(`Tarea ${this.task ? 'guardada' : 'añadida'}`)
    } catch (error) {
      if (isDevMode()) {
        console.error(error)
      }

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al añadir la tarea')
    }
  }

  async removeTask() {
    const loading = await this.$loading.show('Eliminando tarea...')

    try {
      await this.task?.remove()
      await loading.dismiss()
    } catch (error) {
      if (isDevMode()) {
        console.log(error)
      }

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al guardar la tarea')
    }

    return this.dismiss()
  }

  dismiss() {
    return this.$modal.dismiss()
  }

  private _listenCategoryChangesToOpenModal() {
    const { category: initialCategoryValue } = this.taskForm.value

    this.taskForm.controls.category.valueChanges
      .pipe(startWith(initialCategoryValue!), pairwise())
      .subscribe(async ([prev, value]) => {
        if (value !== this.newCategorySymbol) {
          return
        }

        // Reset to a previous selected category
        this.taskForm.controls.category.setValue(prev)

        const modal = await this.$modal.showLazy(
          import(
            '../../../task-categories/modals/new-category-modal/new-category-modal.component'
          ).then((m) => m.NewCategoryModalComponent),
        )

        const { data: addedCategory } = await modal.onDidDismiss<
          ITaskCategory | undefined
        >()

        if (addedCategory) {
          this.taskForm.controls.category.setValue(addedCategory.id!)
        }
      })
  }
}
