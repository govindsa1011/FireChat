import React from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as color from '../utils/colors';
import ProgressDialog from '../Components/ProgressDialog';
import { StackActions, NavigationActions } from 'react-navigation';
import { firebaseAuth } from '../../environment/config';
import AsyncStorage from '@react-native-community/async-storage'

export default class GetStartedComponent extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        strEmail: '',
        strPassword: '',
        isLoading: false
    }

    txtEmailChangeHangler = (value) => {
        this.setState({
            strEmail: value
        })
    }

    txtPasswordChangeHangler = (value) => {
        this.setState({
            strPassword: value
        })
    }

    btnClickHandler = () => {
        if (this.state.isLoading) {
            return;
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.strEmail.trim() === '') {
            ToastAndroid.show("Please enter email id", ToastAndroid.SHORT)
            return;
        } else if (reg.test(this.state.strEmail) === false) {
            ToastAndroid.show("Please enter valid email id", ToastAndroid.SHORT)
            return;
        } else if (this.state.strPassword.trim() === '') {
            ToastAndroid.show('Please enter password', ToastAndroid.SHORT)
            return;
        } else if (this.state.strPassword.length < 6 || this.state.strPassword.length > 15) {
            ToastAndroid.show('Password must be 6 to 15 character', ToastAndroid.SHORT)
            return;
        } else {
            this.doLogin()
        }
    }

    doLogin = async () => {
        this.setState({
            isLoading: true
        })

        firebaseAuth.signInWithEmailAndPassword(this.state.strEmail, this.state.strPassword).then((result) => {
            this.setState({
                isLoading: false
            })
            
            console.log(result)
            this.storeUserDetails(result);
            const navigateAction = StackActions.reset({
                index: 0,
                key:null,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(navigateAction);
        })
            .catch(error => {
                this.setState({
                    isLoading: false
                })
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            });
    }

    storeUserDetails = async (result) => {
        try {
            await AsyncStorage.setItem('@userDetails', JSON.stringify(result))
        } catch (e) {
            // saving error
            console.log(e)
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
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} bounces={true} showsVerticalScrollIndicator={false}>
                        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.getStartedTextStyle}>Get Started</Text>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Poppins-Regular', paddingHorizontal: 16, }}>
                                Let's connect everywhere {'\n'} Have great conversation anytime.
                            </Text>
                            <Image source={require('../../assets/images/chat.png')} style={{ height: 200, width: '80%' }} resizeMode={'contain'} />

                            <TextInput style={styles.textInputStyle}
                                placeholder='Email'
                                keyboardType='email-address'
                                autoCorrect={false}
                                value={this.state.strEmail}
                                onChangeText={this.txtEmailChangeHangler} />

                            <TextInput style={[styles.textInputStyle, { marginTop: 5 }]}
                                placeholder='Password'
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCorrect={false}
                                value={this.state.strPassword}
                                onChangeText={this.txtPasswordChangeHangler} />

                            <TouchableOpacity style={styles.circleShape} onPress={this.btnClickHandler}>
                                {this.state.isLoading ? <ActivityIndicator size='large' color='white'>

                                </ActivityIndicator> :
                                    <Icon name='chevron-right' size={20} color='white' style={{ marginStart: 4 }} />}
                            </TouchableOpacity>

                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Don't have account?</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('SignUp')
                                }}>
                                    <Text style={{ color: color.red, fontSize: 16, marginStart: 5, fontFamily: 'Poppins-Medium' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                        <ProgressDialog isVisible={this.state.isLoading} />
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
        marginTop: 5,
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 8,
        backgroundColor: 'black',
        borderRadius: 50
    }
})