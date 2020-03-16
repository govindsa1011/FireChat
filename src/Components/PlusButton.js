import React, { Component } from 'react';
import { Animated, View, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';

const SIZE = 80;
class PlusButton extends Component {
    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };
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
                            console.log("Rocket")
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
                        <Icon name="camera" size={16} color="#F8F8F8" />
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

                        }}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: color.red
                        }}
                    >
                        <Icon name="video-camera" size={16} color="#F8F8F8" />
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

                        }}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: color.red
                        }}
                    >
                        <Icon name="file-text" size={16} color="#F8F8F8" />
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
            </View>
        );
    }
}
export { PlusButton };