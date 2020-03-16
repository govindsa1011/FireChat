import React from 'react'
import { View, Text, StatusBar, ImageBackground, Image } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseAuth } from '../../environment/config'

export default class SplashComponent extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    componentDidMount() {
        this.naivgationPath()
    }

    naivgationPath = async () => {
        try {
            let route = 'Login'
            const isTutorialFinish = await AsyncStorage.getItem('@isTutorialFinish')
            if (isTutorialFinish === null) {
                route = 'Welcome'
                const navigateAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: route })],
                });

                setTimeout(() => {
                    this.props.navigation.dispatch(navigateAction);
                }, 3000)
            } else {
                firebaseAuth.onAuthStateChanged(user => {
                    route = user ? 'Home' : 'Login'

                    const navigateAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: route })],
                    });

                    setTimeout(() => {
                        this.props.navigation.dispatch(navigateAction);
                    }, 3000)
                })
            }
            0

        } catch (e) {
            // error reading value
            console.log(e)
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

                <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center' }} source={require('../../assets/images/monkey_bg.jpg')} resizeMode={'cover'}>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 80, width: 80 }} source={require('../../assets/images/loading.gif')} ></Image>
                        <Text style={{ color: 'white', fontSize: 28, fontFamily: 'Poppins-Bold' }}>Monkey Chat</Text>
                    </View>
                </ImageBackground>

                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
            </View>
        )
    }
}