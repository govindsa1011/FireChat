import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome to FireChat</Text>
        </View>
      </SafeAreaView>

    )
  }
}