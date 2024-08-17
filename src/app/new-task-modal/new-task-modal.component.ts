import { Component, inject, isDevMode, type OnInit } from '@angular/core'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  ModalController,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone'
import { firstValueFrom } from 'rxjs'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TaskService } from '../task.service'
import { type ITask, type ITaskCategory } from 'src/db'
import { TaskCategoryService } from '../task-category.service'

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
  private $modalCtrl = inject(ModalController)
  private $toastCtrl = inject(ToastController)
  private $loadingCtrl = inject(LoadingController)

  private $task = inject(TaskService)
  private $taskCategory = inject(TaskCategoryService)

  newCategorySymbol = Symbol()
  categories$ = this.$taskCategory.getAll()

  taskForm = this.$formBuilder.group({
    name: ['', Validators.required],
    category: [null as ITaskCategory | symbol | null],
  })

  ngOnInit() {
    this._listenCategoryChangesToOpenModal()
  }

  async onNewTaskSubmit() {
    const { name, category } = this.taskForm.value

    const loading = await this.$loadingCtrl.create({
      message: 'Añadiendo tarea...',
    })

    await loading.present()

    const addedTask$ = this.$task.add({
      name: name!,
      done: false,
      category: category as ITaskCategory,
    })

    try {
      await firstValueFrom(addedTask$)
    } catch (error) {
      if (isDevMode()) {
        console.error(error)
      }

      const errorToast = await this.$toastCtrl.create({
        message: 'Ocurrió un error al añadir la tarea',
        duration: 3000,
      })

      errorToast.present()
    }

    loading.dismiss()
  }

  dismiss() {
    this.$modalCtrl.dismiss()
  }

  private _listenCategoryChangesToOpenModal() {
    this.taskForm.controls.category.valueChanges.subscribe((value) => {
      if (value !== this.newCategorySymbol) {
        return
      }

      // Reset to an empty category
      this.taskForm.controls.category.setValue(null)

      // TODO: Open `New Category modal`
    })
  }
}
