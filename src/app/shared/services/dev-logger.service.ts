import { Injectable, isDevMode } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DevLoggerService {
  logError(...args: any[]) {
    if (isDevMode()) {
      console.error(...args)
    }
  }
}
