import { Component, inject, Input, type OnInit } from '@angular/core'
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
import { RxDocument } from 'rxdb'
import { CommonModule } from '@angular/common'
import { pairwise, startWith } from 'rxjs'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { ITask, type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { TaskCategoriesStoreService } from 'src/app/features/task-categories/services/task-categories-store.service'
import { TaskActionsService } from '../../services/task-actions.service'
import { FeatureFlagsService } from 'src/app/shared/services/feature-flags.service'

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
  private $featureFlags = inject(FeatureFlagsService)

  private $modal = inject(ModalService)

  private $taskActions = inject(TaskActionsService)
  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  newCategorySymbol = Symbol()
  categories$ = this.$taskCategoriesStore.getAll()

  taskForm = this.$formBuilder.group({
    name: ['', Validators.required],
    category: ['' as string | symbol],
  })

  withTaskCategories$ = this.$featureFlags.withBoolean$('task_categories')

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

    if (this.task) {
      await this.$taskActions.saveTask(this.task, {
        name: name!,
        category: category as string,
      })
    } else {
      await this.$taskActions.addTask({
        name: name!,
        done: false,
        category: category as string,
      })
    }
  }

  removeTask() {
    return this.$taskActions.removeTask(this.task!)
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
            '../../../task-categories/modals/category-modal/category-modal.component'
          ).then((m) => m.CategoryModalComponent),
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
