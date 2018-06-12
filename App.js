import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import LibraryScreen from './src/screens/LibraryScreen'
import StoriesScreen from './src/screens/StoriesScreen'
import store from './src/store'

const AppNavigator = createStackNavigator({
  Library: LibraryScreen,
},
{
  initialRouteName: 'Library',
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
