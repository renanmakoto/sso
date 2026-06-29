# CompassTO iOS

Native iOS app built with Swift and SwiftUI. It mirrors the CompassTO Android functionality while following native iOS navigation, controls, Dynamic Type and local persistence conventions.

The interface and service descriptions support 12 languages, including native right-to-left layout for Arabic. Translations are shared with the Android client through `../shared/localizations.json`.

## Requirements

- macOS with Xcode 16 or newer
- iOS 16 or newer deployment target

## Run

1. Open `CompassTO.xcodeproj` in Xcode.
2. Select the `CompassTO` scheme and an iPhone simulator.
3. Press Run.

No third-party packages are required. Language and favorites are stored in `UserDefaults`; eviction questionnaire answers are not persisted.
