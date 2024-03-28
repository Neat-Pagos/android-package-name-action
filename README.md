# android-package-name-action v1
Override your android package name on all important files through github actions

## Features
* Override your android package name on all important files through github actions

## Parameters

- `androidManifestPath`: **Required** Android Manifest path to override version. It is a required parameter. The default value is "android/app/src/main/AndroidManifest.xml".

- `buildGradlePath`: **Required** Build gradle path to override version. It is a required parameter. The default value is "android/app/build.gradle".

- `stringsPath`: **Required** Strings xml path to override version. It is a required parameter. The default value is "android/app/src/main/res/values/strings.xml".

- `mainActivityPath`: **Required** Main Activity path to override version. It is a required parameter. The default value is "android/app/src/main/java/com/neatmobileapp/MainActivity.java".

- `mainApplicationPath`: **Required** Main Application path to override version. It is a required parameter. The default value is "android/app/src/main/java/com/neatmobileapp/MainApplication.java".

- `newPackageName`: **Required** The new package name. It is a required parameter. The default value is "com.neat.mobileappprod".

- `oldPackageName`: **Required** The old package name. It is a required parameter. The default value is "com.neatmobileapp".

## Example
```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: set up JDK 1.11
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: 11.0.22+7
      - name: Change package name
        uses: Neat-Pagos/android-package-name-action@v1
        with:
          androidManifestPath: android/app/src/main/AndroidManifest.xml
          buildGradlePath: android/app/build.gradle
          stringsPath: android/app/src/main/res/values/strings.xml
          mainActivityPath: android/app/src/main/java/com/neatmobileapp/MainActivity.java
          mainApplicationPath: android/app/src/main/java/com/neatmobileapp/MainApplication.java
          reactNativeFlipperPath: android/app/src/release/java/com/neatmobileapp/ReactNativeFlipper.java
          newPackageName: com.testApp.prod
          oldPackageName: com.testApp
```
