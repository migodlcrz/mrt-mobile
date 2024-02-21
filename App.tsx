// In App.js in a new project

import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

// function HomeScreen() {
//   return (
//     <View className="bg-green-400 h-screen">
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

export default App;
