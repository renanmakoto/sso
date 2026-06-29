# CompassTO Android

React Native Android app for navigating Toronto social services, building an eviction-prevention action plan, and connecting seniors and caregivers with support.

The interface and service descriptions support 12 languages, including right-to-left layout for Arabic. Translations are shared with the iOS client through `../shared/localizations.json`.

## Requirements

- Node.js 22.11 or newer
- JDK 17
- Android Studio with the Android SDK and an emulator (or a physical Android device)

Follow the official [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) for the Android SDK and environment variables.

## Run

```sh
npm install
npm run start
```

In a second terminal:

```sh
npm run android
```

## Checks

```sh
npm run typecheck
npm run lint
npm test
```

The app does not request permission to store identity documents, health records or a Social Insurance Number. Questionnaire answers remain in memory; favorites and language are stored locally on the device.
