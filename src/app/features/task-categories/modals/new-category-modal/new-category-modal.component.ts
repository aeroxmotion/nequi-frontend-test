import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
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
  IonLabel,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone'

import { ColorGeneratorService } from 'src/app/shared/services/color-generator.service'

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
  private $modalCtrl = inject(ModalController)
  private $colorGenerator = inject(ColorGeneratorService)

  categoryForm = this.$formBuilder.group({
    name: ['', Validators.required],
    color: [this.$colorGenerator.generate(), Validators.required],
  })

  async onNewCategorySubmit() {}

  dismiss() {
    this.$modalCtrl.dismiss()
  }
}
