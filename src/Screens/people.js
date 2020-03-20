//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, Image, TextInput } from 'react-native';
import PeopleItem from '../Components/peopleItem';
import * as colors from '../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../environment/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
class PeopleComponent extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: () => (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack(null)
                }}>
                    <Icon name='chevron-left' size={20} color='black' style={{ marginStart: 16 }} />
                </TouchableOpacity>
            </View>
        ),
    })

    state = {
        isLoading: false,
        peopleList: []
    }

    onRefresh = () => {
        this.setState({
            isLoading: true
        })
        this.fetchAllPeople();
    }

    onItemPress = (chatItem) => {
        this.props.navigation.navigate('ChatScreen', { data: chatItem })
    }

    componentDidMount() {
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.onRefresh();
    }

    getUserDetails = async () => {
        var userDetails = await AsyncStorage.getItem('@userDetails');
        return JSON.parse(userDetails)
    }

    fetchAllPeople = () => {
        this.ref.get().then((docs) => {
            const peopleList = []
            docs.forEach((doc) => {
                const { id, name, email } = doc.data();
                this.getUserDetails().then((userData) => {
                    var userId = userData.userId;
                    if (id !== userId) {
                        peopleList.push({
                            key: doc.id,
                            doc, // DocumentSnapshot
                            id,
                            name,
                            email,
                        });
                    }
                    this.setState({
                        peopleList,
                        isLoading: false,
                    });
                }).catch(err => {
                    this.setState({
                        isLoading: false,
                    });
                    console.log("getUserDetails error : " + err)
                });
            });
        }).catch(err => {
            this.setState({
                isLoading: false,
            });
            console.log(err.message)
        })
    }

    onCollectionUpdate = (querySnapshot) => {
        this.fetchAllPeople()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBoxStyle}>
                    <TextInput
                        placeholder='Search people'
                        style={styles.edtBoxStyle}
                    />

                    <TouchableOpacity style={styles.btnSearchStyle}>
                        <Icon name='search' size={18} color='white' />
                    </TouchableOpacity>
                </View>
                
                {
                    this.state.peopleList.length > 0 ?
                        <FlatList
                            refreshControl={
                                <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
                            }
                            initialNumToRender={this.state.peopleList.length}
                            style={{ width: '100%', paddingTop: 16 }} showsVerticalScrollIndicator={false} data={this.state.peopleList} renderItem={(info) => (
                                <PeopleItem item={info.item} itemIndex={info.index} onItemPress={this.onItemPress.bind(this)} />
                            )}
                            keyExtractor={(item) => item.id} />
                        : <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            refreshControl={
                                <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
                            }>
                            {((this.state.isLoading === true) && (this.state.peopleList.length === 0)) ?
                                <View></View> :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/empty_chat.png')} style={{ height: 170, width: 170, tintColor: colors.red }} />
                                    <Text style={{ fontFamily: 'Poppins-Medium' }}>No people in community</Text>
                                </View>
                            }
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
    },
    searchBoxStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingStart: 6,
        paddingTop: 3,
        paddingBottom: 3,
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
        justifyContent: 'flex-start'
    },
    edtBoxStyle: {
        flex: 1,
        paddingStart: 16,
        paddingBottom: 8,
        fontFamily: 'Poppins-Regular'
    },
    btnSearchStyle: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 30,
    }
});

//make this component available to the app
export default PeopleComponent;
