import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStartedComponent from './getStarted';

const slides = [
    {
        key: '1',
        title: 'Monkey Chat',
        image: require('../../assets/images/1.png'),
        text: 'Let\'s connect everywhere \n Have great conversation anytime.',
        backgroundColor: '#ffffff',
    },
    {
        key: '2',
        title: 'Sharing Media',
        image: require('../../assets/images/2.png'),
        text: 'You can share\nImages, Videos, Stickers here.',
        backgroundColor: '#ffffff',
    },
    {
        key: '3',
        title: 'Enjoy...',
        image: require('../../assets/images/3.png'),
        text: 'Keep sharing, Keep in touch\nLet\'s have some interesting conversation.',
        backgroundColor: '#ffffff',
    }
];


export default class WelcomeComponent extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        showRealApp: false
    }

    _renderItem = (data) => {
        return (
            <View style={[styles.mainContent, { backgroundColor: data.item.backgroundColor }]}>
                <Text style={styles.title}>{data.item.title}</Text>
                <Image source={data.item.image} style={{ height: 300, width: '100%' }} resizeMode={'contain'} />
                <Text style={styles.text}>{data.item.text}</Text>
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }

    render() {
        if (this.state.showRealApp) {
            return <GetStartedComponent navigation={this.props.navigation}/>;
        } else {
            return (
                <View style={{flex:1}}>
                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent={true}
                    />
                    <AppIntroSlider renderItem={this._renderItem}
                        slides={slides}
                        onDone={this._onDone}
                        renderNextButton={() => {
                            return <View style={styles.circleShape}>
                                <Icon name='chevron-right' size={20} color='white' style={{ marginStart: 4 }} />
                            </View>
                        }}
                        renderDoneButton={() => {
                            return <View style={styles.circleShape}>
                                <Icon name='check' size={20} color='white' />
                            </View>
                        }}
                        activeDotStyle={{ backgroundColor: 'black' }} ></AppIntroSlider>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 26,
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 16,
    },
    circleShape: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: 'black',
        borderRadius: 50
    }
});