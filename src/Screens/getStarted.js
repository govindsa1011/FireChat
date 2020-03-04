import React from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressDialog from '../Components/ProgressDialog';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class GetStartedComponent extends React.Component {

    state = {
        strMobile: '',
        isLoading: false
    }

    txtChangeHangler = (value) => {
        this.setState({
            strMobile: value
        })
    }

    btnClickHandler = () => {
        if (this.state.isLoading) {
            return;
        }

        if (this.state.strMobile.trim() === '') {
            showMessage({
                message: "Mobile number should not empty.",
                type: "danger"
            });
        } else {
            this.setState({
                isLoading: true
            })

            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
                showMessage({
                    message: "Login Successfully",
                    type: "success"
                });

                this.props.navigation.navigate('Phone')
            }, 3000)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <FlashMessage position="top"/>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} bounces={true} showsVerticalScrollIndicator={false}>
                        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.getStartedTextStyle}>Get Started</Text>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Poppins-Regular', paddingHorizontal: 16, }}>
                                Let's connect everywhere {'\n'} Have great conversation anytime.
                            </Text>
                            <Image source={require('../../assets/images/chat.png')} style={{ height: 300, width: '100%' }} resizeMode={'contain'} />
                            <TextInput style={styles.textInputStyle}
                                placeholder='Mobile no.'
                                keyboardType='phone-pad'
                                maxLength={10}
                                autoCorrect={false}
                                value={this.state.strMobile}
                                onChangeText={this.txtChangeHangler} />

                            <TouchableOpacity style={styles.circleShape} onPress={this.btnClickHandler}>
                                {this.state.isLoading ? <ActivityIndicator size='large' color='white'>

                                </ActivityIndicator> :
                                    <Icon name='chevron-right' size={20} color='white' style={{ marginStart: 4 }} />}
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, marginTop: 10, fontFamily: 'Poppins-Medium' }}>Need Help?</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    getStartedTextStyle: {
        fontFamily: 'Poppins-Bold',
        marginTop: 50,
        fontSize: 24,
        alignSelf: 'center'
    },
    textInputStyle: {
        width: '80%',
        fontFamily: 'Poppins-Medium',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.38,
        shadowRadius: 3,
        margin: 20,
        paddingStart: 10,
        paddingBottom: 5,
        elevation: 4,
        backgroundColor: 'white'
    },
    circleShape: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        marginTop: 20,
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 8,
        backgroundColor: 'black',
        borderRadius: 50
    }
})