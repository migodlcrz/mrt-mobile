// In App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ScanPage from './components/ScanPage';
import CardPage from './components/CardPage';
import TransactionPage from './components/TransactionPage';
import {MainProps, RootStackParamList} from './types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MMKV} from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInactivity from 'react-native-user-detector-active-inactive';
import {useEffect, useState} from 'react';
import {AppProps, MainTabsProps} from './types/types';
import useKeyboardHook from 'react-native-user-detector-active-inactive';
import {DeviceEventEmitter} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export const storage = new MMKV();

const App: React.FC<AppProps> = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(storage.getBoolean('access'));

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
        <Stack.Screen name="Transaction" component={TransactionPage} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const MainTabs: React.FC<MainProps> = ({navigation}) => {
  const [currentRoute, setCurrentRoute] = useState('');

  const handleActiveInactive = () => {
    navigation.navigate('Login');
  };

  const onStateChange = (state: any) => {
    setCurrentRoute(state?.routes[state.index]?.name);
  };

  const pressTransaction = () => {
    DeviceEventEmitter.emit('transaction');
  };

  const pressHome = () => {
    DeviceEventEmitter.emit('home');
  };

  const pressCard = () => {
    DeviceEventEmitter.emit('card');
  };

  const pressScan = () => {
    DeviceEventEmitter.emit('scan');
  };

  return (
    // <UserInactivity
    //   currentScreen={currentRoute} // get screen name, if used than timer will to to be reset when navigating screen otherwise not to reset
    //   timeForInactivity={60}
    //   onHandleActiveInactive={handleActiveInactive} // customization setting for navigating screen routing when app-surface is active or in-active beahviour
    //   consoleTimer={true} // To check the timer in console
    //   // style={{flex:1}}   // customize style
    // >
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {backgroundColor: '#0d9276', height: 50, padding: 4},
        tabBarActiveTintColor: '#424242',
        tabBarInactiveTintColor: '#dbe7c9',
        tabBarActiveBackgroundColor: '#21bf7d',
      }}>
      <Tab.Screen
        name="Card"
        component={CardPage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'credit-card' : 'credit-card'}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        listeners={{
          tabPress: pressCard,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanPage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'qrcode' : 'qrcode'}
              size={size}
              color={color}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        listeners={{
          tabPress: pressScan,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={HomePage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name={focused ? 'gear' : 'gear'} size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0d9276',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        listeners={{
          tabPress: pressHome,
        }}
      />
    </Tab.Navigator>
    // </UserInactivity>
  );
};

export default App;
