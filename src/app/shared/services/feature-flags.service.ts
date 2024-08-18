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

  constructor() {
    this.$remoteConfig.defaultConfig = {
      task_categories: false,
    } satisfies Features

    this.$remoteConfig.settings.minimumFetchIntervalMillis = 5_000 // Each 5 seconds

    fetchAndActivate(this.$remoteConfig)
  }

  withBoolean$(feature: FeatureName) {
    return getBooleanChanges(this.$remoteConfig, feature)
  }
}

type Features = {
  task_categories: boolean
}

type FeatureName = keyof Features
