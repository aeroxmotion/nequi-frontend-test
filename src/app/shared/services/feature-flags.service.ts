import { from, mergeMap, Observable } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import {
  RemoteConfig,
  fetchAndActivate,
  getBooleanChanges,
} from '@angular/fire/remote-config'

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  private $remoteConfig = inject(RemoteConfig)

  fetchAndActivate$: Observable<boolean>

  constructor() {
    this.$remoteConfig.defaultConfig = {
      task_categories: false,
    } satisfies Features

    this.$remoteConfig.settings.minimumFetchIntervalMillis = 5_000 // Each 5 seconds

    this.fetchAndActivate$ = from(fetchAndActivate(this.$remoteConfig))
  }

  withBoolean$(feature: FeatureName) {
    return this.fetchAndActivate$.pipe(
      mergeMap(() => getBooleanChanges(this.$remoteConfig, feature)),
    )
  }
}

type Features = {
  task_categories: boolean
}

type FeatureName = keyof Features
