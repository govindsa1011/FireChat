import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashComponent from './src/Screens/splash';
import WelcomeComponent from './src/Screens/welcome';

console.disableYellowBox = true;

const appContainer = createAppContainer(
  createStackNavigator({
    Splash : { screen : SplashComponent},
    Welcome : {screen : WelcomeComponent},
  })
)

export default appContainer