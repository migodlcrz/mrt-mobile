import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  DeviceEventEmitter,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SettingsProps} from '../types/types';
import {storage} from '../App';

const SettingsPage: React.FC<SettingsProps> = ({navigation}) => {
  const handleLogout = () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          navigation.navigate('Login');
        },
      },
    ]);
  };

  useEffect(() => {
    const tabPressListener = DeviceEventEmitter.addListener('settings', () => {
      console.log('PRESSED SETTING');

      return () => {
        tabPressListener.remove();
      };
    });
  }, []);
  return (
    <View className="bg-[#dbe7c9] h-full justify-start items-center p-4">
      <View className="bg-[#0d9276] w-full h-full p-6 rounded-2xl space-y-4">
        <TouchableOpacity className="bg-[#dbe7c9] p-3 rounded-xl">
          <Text className="text-[#0d9276] text-3xl font-bold text-center">
            Change Pin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#dbe7c9] p-3 rounded-xl"
          onPress={handleLogout}>
          <Text className="text-[#0d9276] text-3xl font-bold text-center">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsPage;
