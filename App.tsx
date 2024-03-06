// In App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import TransactionPage from './components/TransactionPage';
import {MainProps, RootStackParamList} from './types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MMKV} from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {AppProps} from './types/types';
import MainTabs from './components/MainTabs';
import {Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export const storage = new MMKV();

const App: React.FC<AppProps> = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(storage.getBoolean('access'));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* {!isLogin ? ( */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Login', headerShown: false}}
        />
        {/* ) : ( */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
        {/* )} */}
        <Stack.Screen
          name="Transaction"
          component={TransactionPage}
          options={{
            title: 'Transaction Details',
            headerStyle: {
              backgroundColor: '#0d9276',
            },
            headerTintColor: '#dbe7c',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
