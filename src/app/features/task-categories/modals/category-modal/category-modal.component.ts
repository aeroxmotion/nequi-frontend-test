import { Component, inject, Input, isDevMode, type OnInit } from '@angular/core'
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
import { RxDocument } from 'rxdb'
import { firstValueFrom } from 'rxjs'

import { type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { LoadingService } from 'src/app/shared/services/loading.service'
import { ColorGeneratorService } from 'src/app/shared/services/color-generator.service'
import { TaskCategoriesStoreService } from '../../services/task-categories-store.service'

@Component({
  standalone: true,
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
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
export class CategoryModalComponent implements OnInit {
  @Input() category?: RxDocument<ITaskCategory>

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

  ngOnInit() {
    if (this.category) {
      this.categoryForm.setValue({
        name: this.category.name,
        color: this.category.color,
      })
    }
  }

  async onNewCategorySubmit() {
    const { name, color } = this.categoryForm.value

    const loading = await this.$loading.show('Añadiendo categoría...')

    try {
      let addedCategory: RxDocument<ITaskCategory> | undefined

      if (this.category) {
        await this.category.incrementalPatch({
          name: name!,
          color: color!,
        })
      } else {
        addedCategory = await firstValueFrom(
          this.$taskCategoriesStore.add({
            name: name!,
            color: color!,
          }),
        )
      }

      await loading.dismiss()
      await this.dismiss(addedCategory)

      await this.$toast.success(
        `Categoría ${this.category ? 'guardada' : 'añadida'}`,
      )
    } catch (error) {
      if (isDevMode()) {
        console.error(error)
      }

      await loading.dismiss()
      await this.$toast.error(
        `Ocurrió un error al ${this.category ? 'guardar' : 'añadir'} la categoría`,
      )
    }
  }

  dismiss(addedCategory?: ITaskCategory) {
    return this.$modal.dismiss(addedCategory)
  }
}
