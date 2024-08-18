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

import { type ITaskCategory } from 'src/db'
import { ModalService } from 'src/app/shared/services/modal.service'
import { ColorGeneratorService } from 'src/app/shared/services/color-generator.service'
import { TaskCategoryActionsService } from '../../services/task-category-actions.service'

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
  private $colorGenerator = inject(ColorGeneratorService)

  private $taskCategoryActions = inject(TaskCategoryActionsService)

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

  async onCategorySubmit() {
    const { name, color } = this.categoryForm.value

    if (this.category) {
      await this.$taskCategoryActions.saveCategory(this.category, {
        name: name!,
        color: color!,
      })

      return this.dismiss()
    }

    const addedCategory = await this.$taskCategoryActions.addCategory({
      name: name!,
      color: color!,
    })

    return this.dismiss(addedCategory)
  }

  async removeCategory() {
    return this.$taskCategoryActions.removeCategory(this.category!)
  }

  dismiss(addedCategory?: ITaskCategory) {
    return this.$modal.dismiss(addedCategory)
  }
}
