import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

function LoginPage() {
  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        backgroundColor: '#dbe7c9',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Login Page</Text>
      <Button title="Login" onPress={navigateHome} />
    </View>
  );
}

export default LoginPage;
