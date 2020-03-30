//import liraries
import React from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator, ToastAndroid, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseAuth } from '../../environment/config';
import { StackActions, NavigationActions } from 'react-navigation';
import ProgressDialog from '../Components/ProgressDialog';
import firebase from '../../environment/config';

// create a component
class SignUpComponent extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.ref = firebase.firestore().collection('users');
        this.state = {
            strName: '',
            strEmail: '',
            strPassword: '',
            strConfirmPassword: '',
            isLoading: false
        }
    }

    txtNameChangeHangler = (value) => {
        this.setState({
            strName: value
        })
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

    txtCPassWordChangeHangler = (value) => {
        this.setState({
            strConfirmPassword: value
        })
    }

    btnClickHandler = () => {
        if (this.state.isLoading) {
            return;
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.strName.trim() === '') {
            ToastAndroid.show("Please enter name", ToastAndroid.SHORT)
            return;
        } else if (this.state.strEmail.trim() === '') {
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
        } else if (this.state.strConfirmPassword.trim() === '') {
            ToastAndroid.show('Please enter confirm password', ToastAndroid.SHORT)
            return;
        } else if (this.state.strPassword.trim() !== this.state.strConfirmPassword.trim()) {
            ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
            return;
        } else {
            this.doSignUp();
        }
    }

    doSignUp = () => {
        this.setState({
            isLoading: true
        })

        try {
            firebaseAuth.createUserWithEmailAndPassword(this.state.strEmail, this.state.strPassword)
                .then((result) => {
                    console.log('User id : ' + result.user.uid);
                    this.ref.add({
                        id: result.user.uid,
                        name: this.state.strName,
                        email: this.state.strEmail,
                        status:'Hey! There I am using Monkey chat.',
                        password: this.state.strPassword,
                        recent_chats:[]
                    })
                    .then((docRef) => {
                        
                        const userData = {
                            userId: result.user.uid,
                            userDocId:docRef.id,
                            name: this.state.strName,
                            email: this.state.strEmail,
                            password: this.state.strPassword
                        }

                        this.storeUserDetails(userData)

                        this.setState({
                            isLoading: false
                        })
                        const navigateAction = StackActions.reset({
                            index: 0,
                            key: null,
                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                        });
                        this.props.navigation.dispatch(navigateAction);

                    }).catch(error => {
                        this.setState({
                            isLoading: false
                        })
                        alert(error.message)
                    });
                })
                .catch(error => {
                    alert(error)
                    this.setState({
                        isLoading: false
                    })
                    console.log(error.message)
                    ToastAndroid.show(error.message, ToastAndroid.SHORT)
                });
        }
        catch (e) {
            alert(e)
        }
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
                            <Text style={styles.getStartedTextStyle}>Connect with us</Text>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Poppins-Regular', paddingHorizontal: 16, }}>
                                Do Register here {'\n'} Enjoy the conversation with buddies.
                            </Text>
                            <Image source={require('../../assets/images/chat.png')} style={{ height: 200, width: '80%' }} resizeMode={'contain'} />

                            <TextInput style={styles.textInputStyle}
                                placeholder='Name'
                                keyboardType='default'
                                autoCorrect={false}
                                value={this.state.strName}
                                onChangeText={this.txtNameChangeHangler} />

                            <TextInput style={[styles.textInputStyle, { marginTop: 0 }]}
                                placeholder='Email'
                                keyboardType='email-address'
                                autoCorrect={false}
                                value={this.state.strEmail}
                                onChangeText={this.txtEmailChangeHangler} />

                            <TextInput style={[styles.textInputStyle, { marginTop: 0 }]}
                                placeholder='Password'
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCorrect={false}
                                value={this.state.strPassword}
                                onChangeText={this.txtPasswordChangeHangler} />

                            <TextInput style={[styles.textInputStyle, { marginTop: 0 }]}
                                placeholder='Re-enter Password'
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCorrect={false}
                                value={this.state.strConfirmPassword}
                                onChangeText={this.txtCPassWordChangeHangler} />

                            <TouchableOpacity style={styles.circleShape} onPress={this.btnClickHandler}>
                                {this.state.isLoading ? <ActivityIndicator size='large' color='white'>

                                </ActivityIndicator> :
                                    <Icon name='chevron-right' size={20} color='white' style={{ marginStart: 4 }} />}
                            </TouchableOpacity>

                            <View style={{ marginTop: 10, marginBottom: 30, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Already have an account?</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.goBack(null)
                                }}>
                                    <Text style={{ color: '#d32e36', fontSize: 16, marginStart: 5, fontFamily: 'Poppins-Medium' }}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                        <ProgressDialog isVisible={this.state.isLoading} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    getStartedTextStyle: {
        fontFamily: 'Poppins-Bold',
        marginTop: 20,
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
});

//make this component available to the app
export default SignUpComponent;
