import { inject, Injectable } from '@angular/core'
import { LoadingController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private $loadingCtrl = inject(LoadingController)

  async show(message: string) {
    const loading = await this.$loadingCtrl.create({
      message,
    })

    await loading.present()

    return loading
  }
}
