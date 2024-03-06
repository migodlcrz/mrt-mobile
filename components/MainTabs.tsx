import {Alert, BackHandler, DeviceEventEmitter} from 'react-native';
import {MainProps} from '../types/types';
import {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CardPage from './CardPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScanPage from './ScanPage';
import SettingsPage from './SettingsPage';
import UserInactivity from 'react-native-user-detector-active-inactive';

const Tab = createBottomTabNavigator();

const MainTabs: React.FC<MainProps> = ({navigation}) => {
  const [currentRoute, setCurrentRoute] = useState('');

  const handleActiveInactive = () => {
    Alert.alert('Session Timeout', '', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Login');
        },
      },
    ]);
  };

  const onStateChange = (state: any) => {
    setCurrentRoute(state?.routes[state.index]?.name);
  };

  const pressTransaction = () => {
    DeviceEventEmitter.emit('transaction');
  };

  const pressHome = () => {
    DeviceEventEmitter.emit('settings');
  };

  const pressCard = () => {
    DeviceEventEmitter.emit('card');
  };

  const pressScan = () => {
    DeviceEventEmitter.emit('scan');
  };

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    // <UserInactivity
    //   currentScreen={currentRoute} // get screen name, if used than timer will to to be reset when navigating screen otherwise not to reset
    //   timeForInactivity={10}
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
        component={SettingsPage}
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

export default MainTabs;
