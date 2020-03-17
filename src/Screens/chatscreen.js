//import liraries
import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import * as colors from '../utils/colors';

// create a component
class ChatScreenComponent extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: null,
        headerLeft: () => (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack(null)
                }}>
                    <Icon name='chevron-left' size={20} color='black' style={{ marginStart: 16 }} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/logo.png')} style={{ height: 40, width: 40, marginStart: 16 }} />
                <Text style={{ marginStart: 16, fontFamily: 'Poppins-Medium', fontSize: 16 }}>Title</Text>
            </View>
        ),
    })

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View>
                        
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.bottomChatBoxStyle}>

                    <TouchableOpacity style={styles.attachmentStyle}>
                        <Icon name='paperclip' size={20} color='white' />
                    </TouchableOpacity>

                    <TextInput
                        placeholder='Type a message'
                        style={styles.edtBoxStyle}
                    />

                    <TouchableOpacity style={{ marginEnd: 8 }}>
                        <Icon name='smile-o' size={24} color={colors.grey} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSendStyle}>
                        <Icon name='paper-plane' size={18} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomChatBoxStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingStart: 6,
        paddingTop:3,
        paddingBottom:3,
        paddingEnd: 6,
        flexDirection: 'row',
        shadowOpacity: 0.29,
        shadowRadius: 4.50,
        elevation: 5,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    edtBoxStyle: {
        flex: 1,
        backgroundColor: 'white',
        paddingStart: 10,
        paddingBottom: 8,
        fontFamily: 'Poppins-Regular'
    },
    attachmentStyle: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 30,
    },
    btnSendStyle: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 30,
    }
});

//make this component available to the app
export default ChatScreenComponent;
