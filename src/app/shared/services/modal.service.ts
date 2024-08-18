import { inject, Injectable } from '@angular/core'
import { ModalController } from '@ionic/angular/standalone'
import { type ComponentRef, type ComponentProps } from '@ionic/core'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private $modalCtrl = inject(ModalController)

  async showLazy<T extends ComponentRef>(
    lazyComponentPromise: Promise<T>,
    componentProps?: ComponentProps<T>,
  ) {
    const modal = await this.$modalCtrl.create({
      component: await lazyComponentPromise,
      componentProps,
    })

    await modal.present()

    return modal
  }

  async dismissIfActive(...args: Parameters<ModalController['dismiss']>) {
    if (await this.$modalCtrl.getTop()) {
      return this.$modalCtrl.dismiss(...args)
    }

    return false
  }

  dismiss(...args: Parameters<ModalController['dismiss']>) {
    return this.$modalCtrl.dismiss(...args)
  }
}
