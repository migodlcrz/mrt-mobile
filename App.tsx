// In App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ScanPage from './components/ScanPage';
import CardPage from './components/CardPage';
import TransactionPage from './components/TransactionPage';
import {RootStackParamList} from './types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MMKV} from 'react-native-mmkv';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export const storage = new MMKV();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {backgroundColor: '#0d9276'},
        tabBarActiveTintColor: '#424242',
        tabBarInactiveTintColor: '#dbe7c9',
        // tabBarActiveBackgroundColor: 'green',
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Card"
        component={CardPage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanPage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionPage}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
