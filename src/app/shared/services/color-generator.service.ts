import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ColorGeneratorService {
  generate() {
    return `#${this._generateHex()}${this._generateHex()}${this._generateHex()}`
  }

  private _generateHex() {
    return `0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2)
  }
}
