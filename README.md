# SweetTooth
This is a social media for Food Lovers made using React Native. Project Development Began on 2nd Feb 2022

All the commands to create and make the project is listed Below

## Create a New Project
The version of Node.js used in this project is 16.13.2 

We are using React Native CLI for this project.

Inorder to create a new project type the follwoing in terminal/cmd:
```
npx react-native init SweetTooth
```
After the creation of this project type
```
cd SweetTooth
```
This will allow you to enter into the project directory where we will be installing some necessary dependencies before starting in the building process.
## Installing Dependencies

###### Installing Navigation Libraries

We will be installing React Native Navigation. You can follow the instruction from this link [React Navigation](https://reactnavigation.org/docs/getting-started)
Type the following in terminal inside your project directory to install react navigation.
```
npm install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler
```
This will primarily install React Navigation, Stack Navigation and Bottom Tab Navigation along with some other essential libraries.


###### Installing Firebase

We will be using Firebase out Backend-as-a-service (Bass). You can follow [Firebase Documentation](https://firebase.google.com/docs/build) for all necessary documentation.

> We will be using Firebase Web Version 9(Modular). DO NOT USE Firebase WEB VERSION 8 FOR THIS PROJECT.
 
Type the following in terminal inside your project directory to install Firebase.
```
npm install firebase
```
This will primarily install Firebase and several of its important tools like 
- Firebase/auth
- Firebase/firestore
- Firebase/storage
- Firebase/database

###### Installing Vector Icons

```
npm install react-native-vector-icons
```

###### Installing React Native Camera For Camera Control
```
yarn add react-native-camera
```

###### Add permissions to your app android/app/src/main/AndroidManifest.xml file:

```
<!-- Required -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Include this only if you are planning to use the camera roll -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Include this only if you are planning to use the microphone for video recording -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

###### Insert the following lines in android/app/build.gradle:

```
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
    multiDexEnabled true // <--- insert this line
  }
}
```


###### Add All Packages By
```
npm install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler firebase react-native-vector-icons react-native-camera
```



## Start The Project

I will be using an external phone for development. You can use an android emulator too as long as it works perfectly fine.

Type the following code in the terminal to start the project. It may take sometime as we are running the file for the first time.
```
npx react-native run-android
```

