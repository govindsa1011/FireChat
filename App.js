import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashComponent from './src/Screens/splash';
import WelcomeComponent from './src/Screens/welcome';
import SignUpComponent from './src/Screens/signup';
import GetStartedComponent from './src/Screens/getStarted';
import HomeComponent from './src/Screens/home';

console.disableYellowBox = true;

const appContainer = createAppContainer(
  createStackNavigator({
    Splash: { screen: SplashComponent },
    Welcome: { screen: WelcomeComponent },
    Login : {screen : GetStartedComponent},
    SignUp : { screen : SignUpComponent},
    Home : {screen : HomeComponent}
  })
)

export default appContainer