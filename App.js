import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashComponent from './src/Screens/splash';
import WelcomeComponent from './src/Screens/welcome';
import SignUpComponent from './src/Screens/signup';
import GetStartedComponent from './src/Screens/getStarted';
import ChatListComponent from './src/Screens/chatList';
import AllLocationComponent from './src/Screens/map';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { PlusButton } from './src/Components/PlusButton';
import * as colors from './src/utils/colors';
import ChatScreenComponent from './src/Screens/chatscreen';
import {decode, encode} from 'base-64';
import PeopleComponent from './src/Screens/people';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode } 

console.disableYellowBox = true;
const DEVICE_WIDTH = Dimensions.get('window').width;

const chatNavigator = createStackNavigator({
  ChatList: {
    screen: ChatListComponent,
    navigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
      },
      title: 'Monkey Chat'
    }
  }
})

const mapNavigator = createStackNavigator({
  AllLocation: {
    screen: AllLocationComponent,
    navigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
      },
      title: 'Locate Buddies'
    }
  }
})

const bottomTabNavigator = createBottomTabNavigator({
  Chat: {
    screen: chatNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="comment"
          color={tintColor}
          size={24}
        />
      )
    })
  },
  // Our plus button
  Plus: {
    screen: () => null, // Empty screen
    navigationOptions: ({navigation}) => ({
      tabBarIcon: <PlusButton navigate={navigation}/> // Plus button component
    })
  },
  Map: {
    screen: mapNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="map"
          color={tintColor}
          size={24}
        />
      )
    })
  },

}, {
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: colors.red, // active icon color
    inactiveTintColor: 'black',  // inactive icon color
    style: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      position: 'absolute',
      bottom: 0,
      elevation: 10,
      width: DEVICE_WIDTH,
      height: 60,
      zIndex: 1
    }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if (navigation.state.routeName === "Plus") {
        return null;
      }
      defaultHandler();
    }
  })
})

const appContainer = createAppContainer(
  createStackNavigator({
    Splash: { screen: SplashComponent },
    Welcome: { screen: WelcomeComponent },
    Login: { screen: GetStartedComponent },
    SignUp: { screen: SignUpComponent },
    Home: {
      screen: bottomTabNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    ChatScreen : {
      screen: ChatScreenComponent,
      navigationOptions: {
        headerTitleAlign: 'left',
        headerStyle: {
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 18
        }
      }
    },
    People : {
      screen:PeopleComponent,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 18
        }
      }
    }
  }),
)

export default appContainer