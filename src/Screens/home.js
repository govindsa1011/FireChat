import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { firebaseAuth } from '../../environment/config';
import { StackActions, NavigationActions } from 'react-navigation';

class HomeComponent extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = { currentUser: null, errorMessage: null }
    }

    componentDidMount() {
        const { currentUser } = firebaseAuth;
        this.setState({ currentUser })
    }
    
    onPressButton = () => {
        firebaseAuth.signOut()
            .then(() => {
                const navigateAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(navigateAction);
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
    </Text>
                <View>
                    <Button
                        onPress={this.onPressButton}
                        title="Sign Out"
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

//make this component available to the app
export default HomeComponent;
