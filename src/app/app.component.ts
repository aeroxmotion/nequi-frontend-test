import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  trashOutline,
  trashSharp,
  bookmarksOutline,
  bookmarksSharp,
  closeOutline,
  addOutline,
  checkmarkOutline,
  checkmarkSharp,
  checkmarkDoneOutline,
  checkmarkDoneSharp,
  closeSharp,
  addSharp,
} from 'ionicons/icons'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Tareas', url: '/tasks', icon: 'checkmark-done' },
    { title: 'Categorías', url: '/categories', icon: 'bookmarks' },
  ]
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']
  constructor() {
    addIcons({
      trashOutline,
      trashSharp,
      bookmarksOutline,
      bookmarksSharp,
      closeOutline,
      closeSharp,
      addOutline,
      addSharp,
      checkmarkOutline,
      checkmarkSharp,
      checkmarkDoneOutline,
      checkmarkDoneSharp,
    })
  }
}
