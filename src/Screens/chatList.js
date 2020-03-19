//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Image } from 'react-native';
import ChatItem from '../Components/chatItem';
import * as colors from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../environment/config';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
class ChatListComponent extends Component {

    state = {
        isLoading: false,
        chatList: [
            {
                id: 1,
                name: 'Test'
            },
            {
                id: 2,
                name: 'Demo'
            },
            {
                id: 3,
                name: 'Chat'
            },
            {
                id: 4,
                name: 'App'
            },
            {
                id: 5,
                name: 'Time Pass'
            },
            {
                id: 6,
                name: 'Test'
            },
            {
                id: 7,
                name: 'Demo'
            },
            {
                id: 8,
                name: 'Chat'
            },
            {
                id: 9,
                name: 'App'
            },
            {
                id: 10,
                name: 'Time Pass'
            }
        ]
    }

    onRefresh = () => {

    }

    onItemPress = (chatItem) => {
        this.props.navigation.navigate('ChatScreen', { data: chatItem })
    }

    componentDidMount() {
        var docId = '';
        this.getUserDetails().then((userData)=> {
            docId = userData.userDocId;
            console.log("Logged In Doc Id: "+JSON.stringify(userData))
        }).catch(err => {
            console.log("getUserDetails error : "+ err)
        });
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

        const recentChats = [];
        

    }

    getUserDetails = async () => {
        var userDetails = await AsyncStorage.getItem('@userDetails');
        return JSON.parse(userDetails)
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { name , email } = doc.data();
            boards.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,
                email,
            });
        });
        // console.log(boards)
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.chatList.length > 0 ?
                        <FlatList
                            refreshControl={
                                <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
                            }
                            initialNumToRender={this.state.chatList.length}
                            style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false} data={this.state.chatList} renderItem={(info) => (
                                <ChatItem item={info.item} itemIndex={info.index} onItemPress={this.onItemPress.bind(this)} />
                            )}
                            keyExtractor={(item) => item.id} />
                        :
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            refreshControl={
                                <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
                            }>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/empty_chat.png')} style={{ height: 170, width: 170, tintColor: colors.red }} />
                                <Text style={{ fontFamily: 'Poppins-Medium' }}>You currently have no conversations</Text>
                                <TouchableOpacity style={styles.btnStyle}>
                                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: 'white' }}>Start Chat</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        backgroundColor: 'transparent',
    },
    btnStyle: {
        backgroundColor: colors.red,
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 5,
        includeFontPadding: false,
        paddingStart: 16,
        paddingEnd: 16,
        elevation: 10,
        marginTop: 10
    }
});

//make this component available to the app
export default ChatListComponent;
