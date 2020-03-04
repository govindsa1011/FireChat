import React from 'react'
import { View, Modal, Image, Text,StatusBar } from 'react-native'

export default class ProgressDialog extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.isVisible}>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.8)', flex: 1,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image style={{ height: 60, width: 60 }} source={require('../../assets/images/loading.gif')} ></Image>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Poppins-Bold' }}>Please wait...</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}