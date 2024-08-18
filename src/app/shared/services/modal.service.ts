import { type ComponentRef } from '@ionic/core'
import { inject, Injectable } from '@angular/core'
import { ModalController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private $modalCtrl = inject(ModalController)

  async showLazy(lazyComponentPromise: Promise<ComponentRef>) {
    const modal = await this.$modalCtrl.create({
      component: await lazyComponentPromise,
    })

    await modal.present()

    return modal
  }

  dismiss(...args: Parameters<ModalController['dismiss']>) {
    return this.$modalCtrl.dismiss(...args)
  }
}
