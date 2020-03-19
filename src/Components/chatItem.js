//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as colors from '../utils/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class ChatItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={()=> this.props.onItemPress(this.props.item)}>
                <View style={[styles.container, {
                    borderTopLeftRadius: (this.props.itemIndex % 2 === 0) ? 20 : 0,
                    borderTopRightRadius: (this.props.itemIndex % 2 === 0) ? 20 : 0,
                    borderBottomLeftRadius: (this.props.itemIndex % 2 === 0) ? 0 : 20,
                    borderBottomRightRadius: (this.props.itemIndex % 2 === 0) ? 0 : 20,
                    marginBottom: (this.props.itemIndex % 2 === 0) ? 8 : 20,
                }]}>

                    <Image source={require('../../assets/images/placeholder.png')}
                        style={{
                            height: 80,
                            width: 80,
                            borderTopLeftRadius: (this.props.itemIndex % 2 === 0) ? 70 : 0,
                            borderTopRightRadius: (this.props.itemIndex % 2 === 0) ? 0 : 70,
                            borderBottomLeftRadius: (this.props.itemIndex % 2 === 0) ? 0 : 70,
                            borderBottomRightRadius: (this.props.itemIndex % 2 === 0) ? 70 : 0,

                        }}
                        resizeMode={'contain'} />
                    <View style={{ flex: 1 }}>
                    <Text style={{ flex: 1, fontFamily: 'Poppins-Medium', fontSize: 18, color: 'black', marginStart: 16, marginTop: 10, marginEnd: 16 }}>{this.props.item.name}</Text>
                        <Text style={{ flex: 1, fontFamily: 'Poppins-Regular', marginStart: 16, color: colors.hintColor, marginBottom: 10, marginEnd: 16 }}>Hello, I am here to help you</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginStart: 20,
        marginEnd: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});

export default ChatItem;
