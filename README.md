# Nequi Frontend Test

Aplicación para la prueba frontend de Nequi.

## Índice de contenidos

1. [Demo](#1-demo)
2. [Instrucciones de instalación](#2-instrucciones-de-instalación)
3. [Ejecución del proyecto](#3-ejecución-del-proyecto)
4. [Preguntas y respuestas](#4-preguntas-y-respuestas)
5. [Descargables](#5-descargables)

## 1. Demo

| Android                                                                                         | iOS                                                                                             |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <video src="https://github.com/user-attachments/assets/fce60a7a-1a4d-4c1a-b36c-5c856616bccf" /> | <video src="https://github.com/user-attachments/assets/97e61235-cc30-41dc-86af-e4a9b22b87b0" /> |

## 2. Instrucciones de instalación

Instalar dependencias mediante `npm`:

```bash
$ npm i
```

Adcionalmente, se recomienda instalar globalmente la CLI de Ionic, o usar `npx` en su defecto:

```bash
$ npm i -g @ionic/cli

# O también
$ npx @ionic/cli ...
```

## 3. Ejecución del proyecto

Para correr el servidor de desarrollo, ejecutar:

```bash
$ npm run start
```

### Android

Para ejecutar en android, correr:

```bash
$ ionic capacitor run android
```

### iOS

Para ejecutar en iOS, correr:

```bash
$ ionic capacitor run ios
```

## 4. Preguntas y respuestas

¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?

- Implementar `RxDB` para gestionar el almacenamiento de datos fue difícil, debido a su compleja,
  y escasa (en cuanto a ejemplos) documentación. Como alternativa, hubiera implementado `Firebase`
  en su modo offline, pero el enfoque de firebase no es `Offline-first`, así que descarté esa
  posibilidad (ver [respuesta stackoverflow](https://stackoverflow.com/a/48871973/11992125)).

¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

- Implementé `code-splitting`/`lazy-loading` sobre las páginas de tareas, categorías, y modales,
  para que se carguen únicamente cuando sean visitados, y se disminuzca el tiempo de carga
  inicial de la aplicación, así como el tamaño final de bundle principal.
- Adicionalmente también implementé `virtualización` sobre el listado de tareas, para que
  únicamente queden cargadas en el DOM las tareas que están en en el viewport.
- Para el almacenamiento local (base de datos) utilicé `RxDB` junto con el plugin `Dexie.js`, que internamente usa `IndexedDB`
  para poder manejar grandes cantidades de datos (`tareas`/`categorías`) de manera mucho más eficiente,
  en comparación con alternativas como `localStorage`, que al ser síncronas, son mucho más lentas y bloquean
  el hilo principal de ejecución de la aplicación.

¿Cómo aseguraste la calidad y mantenibilidad del código?

- Implementé reglas de `ESLint` y `Prettier` para mantener un código consistente en cuando a legibilidad
  y mantenibilidad.
- Implementé una arquitectura basada en `features`, para separar y categorizar el código por cada uno de
  los distintos casos de uso de la aplicación.

## 5. Descargables

- [Android APK](https://github.com/aeroxmotion/nequi-frontend-test/raw/main/downloads/demo-todo-app-nequi.apk)
- `iOS IPA`: Actualmente no cuento con una cuenta de desarrollador de Apple, para poder firmar el IPA y generarlo.
