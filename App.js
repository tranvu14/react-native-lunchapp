import * as React from 'react';
import { Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './app/components/login'
import HomeScreen from './app/components/home'



const Navigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen }
})

const App = createAppContainer(Navigator)

export default App;