// In App.js in a new project

import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import ScanPage from './components/ScanPage';
import CardPage from './components/CardPage';
import TransactionPage from './components/TransactionPage';
import {RootStackParamList} from './types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Login'}}
        />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Card" component={CardPage} />
        <Stack.Screen name="Scan" component={ScanPage} />
        <Stack.Screen name="Transaction" component={TransactionPage} />
        {/* <Stack.Screen name="Transaction" component={TransactionPage} /> */}
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

export default App;
