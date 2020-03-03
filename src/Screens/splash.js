import React from 'react'
import { View, Text, StatusBar, ImageBackground, Image } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

export default class SplashComponent extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        setTimeout(() => {
            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Welcome'})],
            });
            this.props.navigation.dispatch(navigateAction);
        }, 5000)
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