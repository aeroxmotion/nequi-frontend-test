import { Component, inject, isDevMode } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
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
  IonLabel,
} from '@ionic/angular/standalone'
import { firstValueFrom } from 'rxjs'

import { type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ColorGeneratorService } from 'src/app/shared/services/color-generator.service'
import { TaskCategoriesStoreService } from '../../services/task-categories-store.service'

@Component({
  standalone: true,
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrls: ['./new-category-modal.component.scss'],
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
    IonLabel,
  ],
})
export class NewCategoryModalComponent {
  private $formBuilder = inject(FormBuilder)

  private $modal = inject(ModalService)
  private $toast = inject(ToastService)
  private $loading = inject(LoadingService)
  private $colorGenerator = inject(ColorGeneratorService)

  private $taskCategoriesStore = inject(TaskCategoriesStoreService)

  categoryForm = this.$formBuilder.group({
    name: ['', Validators.required],
    color: [this.$colorGenerator.generate(), Validators.required],
  })

  async onNewCategorySubmit() {
    const { name, color } = this.categoryForm.value

    const loading = await this.$loading.show('Añadiendo categoría...')

    const addedCategory$ = this.$taskCategoriesStore.add({
      name: name!,
      color: color!,
    })

    try {
      const addedCategory = await firstValueFrom(addedCategory$)

      await loading.dismiss()
      await this.dismiss(addedCategory)

      await this.$toast.success('Categoría añadida')
    } catch (error) {
      if (isDevMode()) {
        console.error(error)
      }

      await loading.dismiss()
      await this.$toast.error('Ocurrió un error al añadir la categoría')
    }
  }

  dismiss(addedCategory?: ITaskCategory) {
    return this.$modal.dismiss(addedCategory)
  }
}
