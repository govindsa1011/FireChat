import React, { Component } from 'react';
import { Animated, View, Image, TouchableHighlight, AsyncStorage, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';
import { firebaseAuth } from '../../environment/config';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackActions, NavigationActions } from 'react-navigation';
import ProgressDialog from './ProgressDialog';

const SIZE = 80;
class PlusButton extends Component {

    state = {
        isLoading: false
    }

    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };

    btnLogOutClick = () => {
        Alert.alert(
            '',
            'Are you sure want to logout?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        this.setState({
                            isLoading: true
                        })
                        firebaseAuth.signOut()
                            .then(() => {
                                AsyncStorage.removeItem('@userDetails');
                                const navigateAction = StackActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                });
                                setTimeout(() => {
                                    this.setState({
                                        isLoading: false
                                    })
                                    this.props.navigate.dispatch(navigateAction);
                                }, 1500);
                            })
                            .catch(error => {
                                setTimeout(() => {
                                    this.setState({
                                        isLoading: false
                                    })
                                }, 1500);

                                console.log(error.message)
                            });
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        const firstX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -40]
        });
        const firstY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30]
        });
        const secondX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 20]
        });
        const secondY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -55]
        });
        const thirdX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 80]
        });
        const thirdY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30]
        });
        const opacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <View style={{
                position: 'absolute',
                bottom: 20,
                alignItems: 'center'
            }}>
                <Animated.View style={{
                    position: 'absolute',
                    left: firstX,
                    top: firstY,
                    opacity
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.toggleView()
                            this.props.navigate.navigate('People')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: color.red
                        }}
                    >
                        <Icon name="users" size={16} color="#F8F8F8" />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    left: secondX,
                    top: secondY,
                    opacity
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.toggleView()
                            this.props.navigate.navigate('Profile')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: color.red
                        }}
                    >
                        <Icon name="user" size={16} color="#F8F8F8" />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    left: thirdX,
                    top: thirdY,
                    opacity
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.toggleView()
                            this.btnLogOutClick()
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: color.red
                        }}
                    >
                        <Icon name="sign-out" size={16} color="#F8F8F8" />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableHighlight
                    onPress={this.toggleView}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 15,
                        backgroundColor: 'black'
                    }}
                >
                    <Animated.View style={{
                        transform: [
                            { rotate: rotation }
                        ],
                    }}>
                        <Image source={require('../../assets/images/logo.png')} style={{ height: SIZE - 30, width: SIZE - 30 }} />
                    </Animated.View>
                </TouchableHighlight>

                <ProgressDialog isVisible={this.state.isLoading} />
            </View>
        );
    }
}
export { PlusButton };