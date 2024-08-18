import { inject, Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  static DEFAULT_DURATION = 3000

  private $toastCtrl = inject(ToastController)

  async success(message: string) {
    const toast = await this.$toastCtrl.create({
      message,
      color: 'success',
      duration: ToastService.DEFAULT_DURATION,
    })

    await toast.present()

    return toast
  }

  async error(message: string) {
    const toast = await this.$toastCtrl.create({
      message,
      color: 'error',
      duration: ToastService.DEFAULT_DURATION,
    })

    await toast.present()

    return toast
  }
}
