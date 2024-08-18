import { bootstrapApplication } from '@angular/platform-browser'
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router'
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone'

import { routes } from './app/app.routes'
import { AppComponent } from './app/app.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config'

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'nequitodoapptest',
        appId: '1:233448276615:web:8b3f7868c5c271198bae22',
        storageBucket: 'nequitodoapptest.appspot.com',
        apiKey: 'AIzaSyAJV4sPfApc_M9g2BoLGMea_MfcTqu7GLE',
        authDomain: 'nequitodoapptest.firebaseapp.com',
        messagingSenderId: '233448276615',
      }),
    ),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
})
