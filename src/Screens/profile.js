//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import firebase from '../../environment/config';
import * as colors from '../utils/colors';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps'

// create a component
class ProfileComponent extends Component {
    static navigationOptions = () => ({
        header: null
    })

    state = {
        imgUri: undefined,
        isEdit: false
    }

    imgEditClick = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("Source:- " + source)
                this.setState({
                    imgUri: source.uri,
                });
            }
        });
    }

    renderBioUi = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Poppins-Medium', includeFontPadding: false, marginStart: 30, fontSize: 14 }}>Hey! There I am using Monkey chat.</Text>
                <TouchableOpacity style={[styles.btnCameraStyle, { width: 24, height: 24, margin: 0, marginStart: 10 }]}>
                    <Icon name='pencil' size={10} color='white' />
                </TouchableOpacity>
            </View>
        )
    }

    renderMapUi = () => {
        return (
            <View style={{ flex: 1, margin: 20, overflow: 'hidden', borderRadius: 20 }}>
                <MapView
                    ref={MapView => (this.MapView = MapView)}
                    initialRegion={{
                        latitude: 23.025719,
                        longitude: 72.503360,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    style={{ height: '100%' }}
                    loadingEnabled={true}
                    scrollEnabled={false}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    moveOnMarkerPress={true}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsPointsOfInterest={false}
                    provider="google"
                >
                    <Marker
                        coordinate={{
                            latitude: 23.025719,
                            longitude: 72.503360
                        }}
                        image={require('../../assets/images/marker.png')}
                        tracksViewChanges={false}
                        title='You are here'
                        anchor={{ x: 0.5, y: 0.8 }}
                        identifier='1'
                    >
                        {/* <View>
                                    <Image style={{ width: 40, height: 40 }} source={require('../../assets/images/marker.png')} />
                                </View> */}
                    </Marker>
                </MapView>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={this.state.imgUri == undefined ? require('../../assets/images/monkey_bg.jpg') : { uri: this.state.imgUri }} style={styles.upperCurvedShape} imageStyle={{
                    borderBottomLeftRadius: 60,
                    borderBottomRightRadius: 60,
                }}>
                    <TouchableOpacity style={styles.btnCameraStyle} onPress={() => this.imgEditClick()}>
                        <Icon name='camera' color='white' size={16} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{ height: 15, marginTop: 10, marginBottom: 10, backgroundColor: 'black', marginRight: 60, marginLeft: 60, borderRadius: 20 }} />
                <View style={styles.bottomCurvedShape}>
                    <Text style={{ fontFamily: 'Poppins-Bold', marginStart: 30, marginTop: 20, fontSize: 18, includeFontPadding: false }}>Govind Prajapati</Text>
                    {this.renderBioUi()}
                    <Text style={{ fontFamily: 'Poppins-Bold', includeFontPadding: false, marginStart: 30, marginTop: 20, fontSize: 14 }}>Email Id</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', includeFontPadding: false, marginStart: 30, fontSize: 16 }}>govind@gmail.com</Text>
                    {this.renderMapUi()}
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    upperCurvedShape: {
        flex: 0.45,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    bottomCurvedShape: {
        flex: 0.55,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    btnCameraStyle: {
        height: 40,
        width: 40,
        alignSelf: 'flex-end',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 30,
    },
    btnEditStyle: {
        height: 40,
        width: 40,
        alignSelf: 'flex-end',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 30,
    }
});

//make this component available to the app
export default ProfileComponent;
