import React from 'react';
import {Platform} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashComponent from './src/Screens/splash';
import WelcomeComponent from './src/Screens/welcome';
import * as firebase from 'react-native-firebase'
import PhoneAuth from './src/Screens/phoneAuth';

console.disableYellowBox = true;

const firebaseConfig = {
  apiKey: "AIzaSyAWmGSu9qEe_8hQzvjW8toHIKOsd9FiAbc",
  authDomain: "chatreactdemo-8bd21.firebaseapp.com",
  databaseURL: "https://chatreactdemo-8bd21.firebaseio.com",
  projectId: "chatreactdemo-8bd21",
  storageBucket: "gs://chatreactdemo-8bd21.appspot.com",
  messagingSenderId: "699072685684",
  appId:Platform.OS=="android"?"1:699072685684:android:2437e0c02c6d6512d89321":"1:699072685684:ios:f62403cd4de0dc80d89321"
}

firebase.default.initializeApp(firebaseConfig)

const appContainer = createAppContainer(
  createStackNavigator({
    Splash: { screen: SplashComponent },
    Welcome: { screen: WelcomeComponent },
    Phone : { screen : PhoneAuth}
  })
)

export default appContainer